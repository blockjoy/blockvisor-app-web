import { hostClient, nodeClient } from '@modules/grpc';
import { Skeleton } from '@shared/components';
import { useEffect, useState } from 'react';
import { Currency } from '../../AdminFinances/Currency/Currency';
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

export const AdminDashboardFinances = () => {
  const [totals, setTotals] = useState<Totals>();

  useEffect(() => {
    (async () => {
      const { nodes } = await nodeClient.listNodes(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });

      const customerNodes = nodes.filter(
        (node) => node.orgId !== 'f0210007-f981-4f53-8826-efa2509991d2',
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
          (node) => node.hostId === host.id && node.cost,
        );

        const revenue = nodesWithRevenue
          .map((node) => node.cost?.amount?.amountMinorUnits || 0)
          .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

        const profit = !host.cost
          ? -1
          : revenue - (host.cost?.amount?.amountMinorUnits! ?? 0);

        totalRevenue += revenue;
        totalProfit += profit;
        totalCost += host.cost?.amount?.amountMinorUnits ?? 0;
      }

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

  const CustomSkeleton = () => (
    <Skeleton height="24px" width="130px" margin="8px 0 8px" />
  );

  return (
    <>
      <div css={styles.card}>
        <h2 css={styles.label}>Revenue</h2>
        {totals?.totalRevenue === undefined ? (
          <CustomSkeleton />
        ) : (
          <Currency cents={totals?.totalRevenue} isShort />
        )}
        <h3 css={styles.subtitle}>On {totals?.totalNodesWithRevenue} nodes</h3>
      </div>
      <div css={styles.card}>
        <h2 css={styles.label}>Cost</h2>

        {totals?.totalCost === undefined ? (
          <CustomSkeleton />
        ) : (
          <Currency cents={-totals?.totalCost!} isShort />
        )}
        <h3 css={styles.subtitle}>On {totals?.totalHosts} hosts</h3>
      </div>
      <div css={styles.card}>
        <h2 css={styles.label}>Profit</h2>
        {totals?.totalProfit === undefined ? (
          <CustomSkeleton />
        ) : (
          <Currency cents={totals?.totalProfit} hasColor hasIcon isShort />
        )}
        <h3 css={styles.subtitle}>
          {Math.abs(totals?.totalProfitPercent!).toFixed(1)}% of cost
        </h3>
      </div>
    </>
  );
};
