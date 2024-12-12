import { hostClient, nodeClient } from '@modules/grpc';
import { NextLink, SvgIcon, TableSkeleton } from '@shared/components';
import { KeyboardEvent, PropsWithChildren, useEffect, useState } from 'react';
import { styles } from './AdminFinancesByHost.styles';
import { Currency } from './Currency/Currency';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import IconArrowDown from '@public/assets/icons/common/ArrowDown.svg';
import { formatters } from '@shared/index';
import { toast } from 'react-toastify';

type HostProfit = {
  hostId: string;
  hostName: string;
  orgName: string;
  cost: number;
  revenue: number;
  profit: number;
};

type SortField = 'hostName' | 'orgName' | 'cost' | 'profit' | 'revenue';

const columns = [
  {
    field: 'hostName',
    displayName: 'Host',
  },
  {
    field: 'orgName',
    displayName: 'Org',
  },
  {
    field: 'cost',
    canEdit: true,
  },
  {
    field: 'revenue',
  },
  {
    field: 'profit',
  },
];

const sort = (
  items: HostProfit[],
  sortField: SortField,
  sortOrder: SortOrder,
) => {
  return [
    ...items.sort((a: any, b: any) => {
      const aField: any = a[sortField];
      const bField: any = b[sortField];

      if (typeof aField === 'number' && typeof bField === 'number') {
        return sortOrder === SortOrder.SORT_ORDER_ASCENDING
          ? aField - bField
          : bField - aField;
      }

      if (typeof aField === 'string' && typeof bField === 'string') {
        const comparison = aField
          ?.toString()
          .toLowerCase()
          .localeCompare(bField.toLowerCase());
        return sortOrder === SortOrder.SORT_ORDER_ASCENDING
          ? comparison
          : -comparison;
      }

      return 0;
    }),
  ];
};

const EditControl = ({
  value,
  hostId,
  onUpdate,
}: {
  value?: number;
  hostId: string;
  onUpdate: (hostId: string, nextValue: string) => void;
}) => {
  const [nextValue, setNextValue] = useState<string>(
    !value ? '0' : formatters.formatCurrency(value),
  );

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) =>
    setNextValue(e.target.value);

  const handleUpdate = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onUpdate(hostId, nextValue);
    }
  };

  return (
    <input
      css={styles.editControl}
      type="text"
      onInput={handleInput}
      defaultValue={formatters.formatCurrency(value!)}
      onKeyUp={handleUpdate}
    />
  );
};

const SortButton = ({
  children,
  showSortIcon,
  sortOrder,
  onSort,
}: {
  showSortIcon: boolean;
  sortOrder: SortOrder;
  onSort: VoidFunction;
} & PropsWithChildren) => {
  return (
    <button
      css={[styles.sortButton, showSortIcon && styles.sortButtonSelected]}
      onClick={onSort}
    >
      {children}
      {showSortIcon && (
        <span
          style={{
            rotate:
              sortOrder === SortOrder.SORT_ORDER_ASCENDING
                ? '180deg'
                : undefined,
          }}
        >
          <SvgIcon size="12px" isDefaultColor>
            <IconArrowDown />
          </SvgIcon>
        </span>
      )}
    </button>
  );
};

export const AdminFinancesByHost = () => {
  const [hostsProfit, setHostsProfit] = useState<HostProfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortField, setSortField] = useState<SortField>('profit');
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    SortOrder.SORT_ORDER_DESCENDING,
  );

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
        const revenue = nodes
          .filter((node) => node.hostId === host.id && node.cost)
          .map((node) => node.cost?.amount?.amountMinorUnits ?? 0)
          .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

        const profit = !host.cost
          ? -1
          : revenue - (host.cost?.amount?.amountMinorUnits! ?? 0);

        hostsProfitArray.push({
          hostId: host.id,
          hostName: host.name,
          orgName: host.orgName,
          profit,
          revenue,
          cost: host.cost?.amount?.amountMinorUnits ?? 0,
        });
      }

      setHostsProfit(
        sort(hostsProfitArray, 'profit', SortOrder.SORT_ORDER_DESCENDING),
      );

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const sortedHostsProfit = sort(hostsProfit, sortField, sortOrder);
    setHostsProfit(sortedHostsProfit);
  }, [sortField, sortOrder]);

  const handleSort = (nextSortField: SortField, nextSortOrder: SortOrder) => {
    setSortField(nextSortField);
    setSortOrder(nextSortOrder);
  };

  const handleUpdate = async (hostId: string, nextValue: string) => {
    const parsedValue = parseFloat(
      nextValue.replaceAll('$', '').replaceAll(',', ''),
    );

    const isValid = !isNaN(parsedValue);

    if (!isValid) {
      toast.error('Invalid Cost');
      return;
    }

    await hostClient.updateHost({
      id: hostId,
      cost: {
        period: 1,
        amount: {
          currency: 1,
          amountMinorUnits:
            parseFloat(nextValue.replaceAll('$', '').replaceAll(',', '')) * 100,
        },
      },
    });

    toast.success('Cost Updated');
  };

  return (
    <section css={styles.wrapper}>
      {isLoading ? (
        <div style={{ marginTop: '24px' }}>
          <TableSkeleton />
        </div>
      ) : !hostsProfit?.length ? (
        <p>No profits</p>
      ) : (
        <div css={styles.tableWrapper}>
          <table css={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field} style={{ width: '20%' }}>
                    <SortButton
                      sortOrder={sortOrder}
                      showSortIcon={sortField === column.field}
                      onSort={() =>
                        handleSort(
                          column.field as SortField,
                          sortOrder === SortOrder.SORT_ORDER_ASCENDING
                            ? SortOrder.SORT_ORDER_DESCENDING
                            : SortOrder.SORT_ORDER_ASCENDING,
                        )
                      }
                    >
                      {column.displayName || column.field}
                    </SortButton>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hostsProfit?.map((hostProfit) => (
                <tr key={hostProfit.hostId}>
                  <td>
                    <NextLink
                      href={`/admin?name=hosts&id=${hostProfit.hostId}`}
                    >
                      {hostProfit.hostName}
                    </NextLink>
                  </td>
                  <td>{hostProfit.orgName}</td>
                  <td>
                    <EditControl
                      onUpdate={handleUpdate}
                      value={hostProfit.cost ?? 0}
                      hostId={hostProfit.hostId}
                    />
                  </td>
                  <td>
                    <Currency cents={hostProfit.revenue} />
                  </td>
                  <td>
                    <Currency hasColor hasIcon cents={hostProfit.profit} />
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
