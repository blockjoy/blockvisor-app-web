import { AdminList } from '../AdminList/AdminList';
import { organizationClient } from '@modules/grpc';
import { pageSize } from '@modules/admin/constants/constants';
import { Org, OrgSortField } from '@modules/grpc/library/blockjoy/v1/org';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { DateTime } from '@shared/components';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';

const columns: AdminListColumn[] = [
  {
    name: 'name',
    width: '300px',
    sortField: OrgSortField.ORG_SORT_FIELD_NAME,
    isVisible: true,
  },
  {
    name: 'nodeCount',
    displayName: 'Nodes',
    width: '100px',
    sortField: OrgSortField.ORG_SORT_FIELD_NODE_COUNT,
    isVisible: true,
  },
  {
    name: 'hostCount',
    displayName: 'Hosts',
    width: '100px',
    sortField: OrgSortField.ORG_SORT_FIELD_HOST_COUNT,
    isVisible: true,
  },
  {
    name: 'memberCount',
    displayName: 'Members',
    width: '100px',
    sortField: OrgSortField.ORG_SORT_FIELD_MEMBER_COUNT,
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
    const response = await organizationClient.listOrganizations(
      {
        currentPage: page! || 0,
        itemsPerPage: pageSize,
      },
      [
        {
          field: sortField!,
          order: sortOrder!,
        },
      ],
      keyword,
      true,
      false,
    );
    return {
      list: response.orgs,
      total: response.total,
    };
  };

  const listMap = (list: Org[]) =>
    list.map((item) => {
      return {
        ...item,
        createdAt: <DateTime date={item.createdAt!} />,
      };
    });

  return (
    <AdminList
      name="orgs"
      idPropertyName="orgId"
      defaultSortField={OrgSortField.ORG_SORT_FIELD_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
    />
  );
};
