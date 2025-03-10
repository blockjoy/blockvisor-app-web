import { nodeClient, organizationClient } from '@modules/grpc';
import { NextLink, SvgIcon, TableSkeleton } from '@shared/components';
import { PropsWithChildren, useEffect, useState } from 'react';
import { styles } from './AdminFinancesByOrg.styles';
import { Currency } from './Currency/Currency';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import IconArrowDown from '@public/assets/icons/common/ArrowDown.svg';

type OrgRevenue = {
  orgId: string;
  orgName: string;
  nodes: number;
  revenue: number;
};

type SortField = 'orgId' | 'orgName' | 'nodes' | 'revenue';

const columns = [
  {
    field: 'orgName',
    displayName: 'Org',
  },
  {
    field: 'nodes',
  },
  {
    field: 'revenue',
  },
];

const blockjoyOrgs = [
  'f0210007-f981-4f53-8826-efa2509991d2',
  '2a98604b-8d01-4dda-8516-a3e99f564170',
  'c71f6380-0c26-479c-a220-463d1637844b',
  '15d793dd-84da-4eb5-b617-64c714ff056b',
];

const sort = (
  items: OrgRevenue[],
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

export const AdminFinancesByOrg = () => {
  const [orgRevenue, setOrgRevenue] = useState<OrgRevenue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    SortOrder.SORT_ORDER_DESCENDING,
  );

  useEffect(() => {
    (async () => {
      const { nodes } = await nodeClient.listNodes(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });

      const { orgs } = await organizationClient.listOrganizations(
        {
          currentPage: 0,
          itemsPerPage: 10000,
        },
        undefined,
        undefined,
        true,
      );

      const orgRevenueArray: OrgRevenue[] = [];

      for (let org of orgs) {
        const revenue = nodes
          .filter((node) => node.orgId === org.orgId && node.cost)
          .map((node) => node.cost?.amount?.amountMinorUnits ?? 0)
          .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

        orgRevenueArray.push({
          nodes: org.nodeCount,
          orgId: org.orgId,
          orgName: org.name,
          revenue,
        });
      }

      setOrgRevenue(
        sort(
          orgRevenueArray.filter(
            (org) =>
              (org.orgName === 'Personal' && org.nodes > 0) ||
              (org.nodes > 0 && !blockjoyOrgs.includes(org.orgId)),
          ),
          'revenue',
          SortOrder.SORT_ORDER_DESCENDING,
        ),
      );

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const sorted = sort(orgRevenue, sortField, sortOrder);
    setOrgRevenue(sorted);
  }, [sortField, sortOrder]);

  const handleSort = (nextSortField: SortField, nextSortOrder: SortOrder) => {
    setSortField(nextSortField);
    setSortOrder(nextSortOrder);
  };

  return (
    <section css={styles.wrapper}>
      {isLoading ? (
        <div style={{ marginTop: '24px' }}>
          <TableSkeleton />
        </div>
      ) : !orgRevenue?.length ? (
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
              {orgRevenue?.map((org) => (
                <tr key={org.orgId}>
                  <td>
                    <NextLink href={`/admin?name=orgs&id=${org.orgId}`}>
                      {org.orgName}
                    </NextLink>
                  </td>
                  <td>{org.nodes}</td>
                  <td>
                    <Currency hasColor hasIcon cents={org.revenue} />
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
