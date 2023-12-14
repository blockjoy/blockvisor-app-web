import { AdminList } from '../AdminList/AdminList';
import { userClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { pageSize } from '@modules/admin/constants/constants';
import { UserSortField } from '@modules/grpc/library/blockjoy/v1/user';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

const columns: AdminListColumn[] = [
  {
    name: 'firstName',
    width: '230px',
    sortField: UserSortField.USER_SORT_FIELD_FIRST_NAME,
    isVisible: false,
  },
  {
    name: 'lastName',
    width: '230px',
    sortField: UserSortField.USER_SORT_FIELD_LAST_NAME,
    isVisible: false,
  },
  {
    name: 'fullName',
    width: '280px',
    sortField: UserSortField.USER_SORT_FIELD_FIRST_NAME,
    isVisible: true,
  },
  {
    name: 'email',
    width: '330px',
    canCopy: true,
    sortField: UserSortField.USER_SORT_FIELD_EMAIL,
    isVisible: true,
  },
  {
    name: 'created',
    sortField: UserSortField.USER_SORT_FIELD_CREATED_AT,
    isVisible: true,
  },
];

export const AdminUsers = () => {
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
      getList={getList}
      listMap={listMap}
    />
  );
};
