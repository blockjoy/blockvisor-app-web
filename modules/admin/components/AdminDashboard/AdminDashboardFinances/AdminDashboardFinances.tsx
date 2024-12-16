import { hostClient, nodeClient } from '@modules/grpc';
import { Skeleton } from '@shared/components';
import { useEffect, useState } from 'react';
import { Currency } from '../../AdminFinancesByHost/Currency/Currency';
import { styles } from './AdminDashboardFinances.styles';

type Totals = {
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
  totalProfitPercent: number;
  totalNodesWithRevenue: number;
  totalHosts: number;
  totalPositiveHosts: number;
  totalNegativeHosts: number;
};

const blockjoyOrgs = [
  'f0210007-f981-4f53-8826-efa2509991d2',
  '2a98604b-8d01-4dda-8516-a3e99f564170',
  'c71f6380-0c26-479c-a220-463d1637844b',
  '15d793dd-84da-4eb5-b617-64c714ff056b',
];

export const AdminDashboardFinances = () => {
  const [totals, setTotals] = useState<Totals>();

  useEffect(() => {
    (async () => {
      const { nodes } = await nodeClient.listNodes(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });

      const customerNodes = nodes.filter(
        (node) => !blockjoyOrgs.includes(node.orgId),
      );

      const { hosts } = await hostClient.listHosts(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });

      let totalRevenue = 0;
      let totalProfit = 0;
      let totalCost = 0;

      for (let host of hosts) {
        const nodesWithRevenue = customerNodes.filter(
          (node) => node.hostId === host.hostId && node.cost,
        );

        const revenue = nodesWithRevenue
          .map((node) => node.cost?.amount?.amountMinorUnits || 0)
          .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

        const profit = !host.cost
          ? -1
          : revenue - (host.cost?.amount?.amountMinorUnits! ?? 0);

        totalRevenue += revenue;
        totalCost += host.cost?.amount?.amountMinorUnits ?? 0;
      }

      totalProfit = totalRevenue - totalCost;

      const totalProfitPercent = (totalProfit / totalCost) * 100;

      setTotals({
        totalRevenue,
        totalCost,
        totalProfit,
        totalNegativeHosts: 0,
        totalPositiveHosts: 0,
        totalProfitPercent,
        totalNodesWithRevenue: customerNodes.length,
        totalHosts: hosts.length,
      });
    })();
  }, []);

  const CustomSkeletonLarge = () => (
    <Skeleton height="24px" width="110px" margin="8px 0 6px" />
  );

  const CustomSkeletonSmall = () => (
    <Skeleton height="16px" width="80px" margin="0px 0 4px" />
  );

  return (
    <>
      <div css={styles.card}>
        <h2 css={styles.label}>Revenue</h2>
        {totals?.totalRevenue === undefined ? (
          <CustomSkeletonLarge />
        ) : (
          <div css={styles.value}>
            <Currency cents={totals?.totalRevenue} isShort />
            <abbr>/ Month</abbr>
          </div>
        )}
        <h3 css={styles.subtitle}>
          {!totals ? (
            <CustomSkeletonSmall />
          ) : (
            `On ${totals?.totalNodesWithRevenue} nodes`
          )}
        </h3>
      </div>
      <div css={styles.card}>
        <h2 css={styles.label}>Cost</h2>
        {totals?.totalCost === undefined ? (
          <CustomSkeletonLarge />
        ) : (
          <div css={styles.value}>
            <Currency cents={-totals?.totalCost!} isShort />
            <abbr>/ Month</abbr>
          </div>
        )}
        <h3 css={styles.subtitle}>
          {!totals ? <CustomSkeletonSmall /> : `On ${totals?.totalHosts} hosts`}
        </h3>
      </div>
      <div css={styles.card}>
        <h2 css={styles.label}>Profit</h2>
        {totals?.totalProfit === undefined ? (
          <CustomSkeletonLarge />
        ) : (
          <div css={styles.value}>
            <Currency cents={totals?.totalProfit} hasColor isShort />
            <abbr>/ Month</abbr>
          </div>
        )}
        <h3 css={styles.subtitle}>
          {!totals ? (
            <CustomSkeletonSmall />
          ) : (
            `${Math.abs(totals?.totalProfitPercent!).toFixed(1)}% of cost`
          )}
        </h3>
      </div>
    </>
  );
};
