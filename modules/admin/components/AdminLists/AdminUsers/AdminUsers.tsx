import { AdminList, AdminListColumn } from '../AdminList/AdminList';
import { userClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { pageSize } from '@modules/admin/constants/constants';
import { UserSortField } from '@modules/grpc/library/blockjoy/v1/user';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

const columns: AdminListColumn[] = [
  {
    name: 'fullName',
    width: '280px',
    sortField: UserSortField.USER_SORT_FIELD_FIRST_NAME,
  },
  {
    name: 'email',
    width: '330px',
    canCopy: true,
    sortField: UserSortField.USER_SORT_FIELD_EMAIL,
  },
  {
    name: 'created',
    sortField: UserSortField.USER_SORT_FIELD_CREATED_AT,
  },
];

export const AdminUsers = () => {
  const { getTotalUsers: getTotal } = useAdminGetTotals();

  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: UserSortField,
    sortOrder?: SortOrder,
  ) => {
    const response = await userClient.listUsers(
      keyword,
      {
        current_page: page!,
        items_per_page: pageSize,
      },
      [{ field: sortField!, order: sortOrder! }],
    );
    return {
      list: response.users,
      total: response.userCount,
    };
  };

  const listMap = (list: any[]) =>
    list.map((item) => {
      return {
        ...item,
        fullName: `${item.firstName} ${item.lastName}`,
        created: `${formatters.formatDate(
          item.createdAt!,
        )} @ ${formatters.formatDate(item.createdAt!, 'time')}`,
      };
    });

  return (
    <AdminList
      name="users"
      columns={columns}
      defaultSortField={UserSortField.USER_SORT_FIELD_FIRST_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
