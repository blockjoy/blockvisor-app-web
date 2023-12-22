import { AdminList } from '../AdminList/AdminList';
import { organizationClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { pageSize } from '@modules/admin/constants/constants';
import { Org, OrgSortField } from '@modules/grpc/library/blockjoy/v1/org';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

const columns: AdminListColumn[] = [
  {
    name: 'name',
    width: '230px',
    sortField: OrgSortField.ORG_SORT_FIELD_NAME,
    isVisible: true,
  },
  {
    name: 'nodeCount',
    displayName: 'Nodes',
    width: '50px',
    isVisible: true,
  },
  {
    name: 'hostCount',
    displayName: 'Hosts',
    width: '100px',
    isVisible: true,
  },
  {
    name: 'createdAt',
    width: '230px',
    sortField: OrgSortField.ORG_SORT_FIELD_CREATED_AT,
    isVisible: true,
  },
];

export const AdminOrgs = () => {
  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: OrgSortField,
    sortOrder?: SortOrder,
  ) => {
    const response = await organizationClient.getOrganizations(
      {
        current_page: page! || 0,
        items_per_page: pageSize,
      },
      [
        {
          field: sortField!,
          order: sortOrder!,
        },
      ],
      keyword,
      true,
    );
    return {
      list: response.orgs,
      total: response.orgCount,
    };
  };

  const listMap = (list: Org[]) =>
    list.map((item) => {
      return {
        ...item,
        createdAt: `${formatters.formatDate(
          item.createdAt!,
        )} @ ${formatters.formatDate(item.createdAt!, 'time')}`,
      };
    });

  return (
    <AdminList
      name="orgs"
      defaultSortField={OrgSortField.ORG_SORT_FIELD_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
    />
  );
};
