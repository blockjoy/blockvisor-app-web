import { hostClient, nodeClient } from '@modules/grpc';
import { Currency, NextLink, sort, TableSkeleton } from '@shared/components';
import { useEffect, useState } from 'react';
import { styles } from './AdminCosts.styles';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { AdminHeader } from '../AdminHeader/AdminHeader';

type HostProfit = {
  host: Host;
  profit: number;
};

export const AdminCosts = () => {
  const [hostsProfit, setHostsProfit] = useState<HostProfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { nodes } = await nodeClient.listNodes(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });

      const { hosts } = await hostClient.listHosts(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });

      const hostsProfitArray: HostProfit[] = [];

      for (let host of hosts) {
        const nodeTotalRevenue = nodes
          .filter((node) => node.hostId === host.id && node.cost)
          .map((node) => node.cost?.amount?.amountMinorUnits || 0)
          .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

        const profit = !host.cost
          ? -1
          : nodeTotalRevenue - (host.cost?.amount?.amountMinorUnits! ?? 0);

        hostsProfitArray.push({
          host,
          profit,
        });
      }

      setHostsProfit(
        sort(hostsProfitArray, { field: 'profit', order: 'desc' }),
      );

      setIsLoading(false);
    })();
  }, []);

  return (
    <section css={styles.wrapper}>
      <AdminHeader name="Costs">Costs</AdminHeader>
      {isLoading ? (
        <TableSkeleton />
      ) : !hostsProfit?.length ? (
        <p>No profits</p>
      ) : (
        <div css={styles.tableWrapper}>
          <table css={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '33.33%' }}>Host</th>
                <th style={{ width: '33.33%' }}>Org</th>
                <th style={{ width: '33.33%' }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {hostsProfit?.map((hostProfit) => (
                <tr key={hostProfit.host.id}>
                  <td>
                    <NextLink
                      href={`/admin?name=hosts&id=${hostProfit.host.id}`}
                    >
                      {hostProfit.host.name}
                    </NextLink>
                  </td>
                  <td>{hostProfit.host.orgName}</td>
                  <td>
                    <Currency cents={hostProfit.profit} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
