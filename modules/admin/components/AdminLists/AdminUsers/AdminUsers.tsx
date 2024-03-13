import { AdminList } from '../AdminList/AdminList';
import { userClient } from '@modules/grpc';
import { pageSize } from '@modules/admin/constants/constants';
import { User, UserSortField } from '@modules/grpc/library/blockjoy/v1/user';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { DateTime } from '@shared/components';

const columns: AdminListColumn[] = [
  {
    name: 'firstName',
    width: '230px',
    sortField: UserSortField.USER_SORT_FIELD_FIRST_NAME,
    isVisible: true,
  },
  {
    name: 'lastName',
    width: '230px',
    sortField: UserSortField.USER_SORT_FIELD_LAST_NAME,
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
    name: 'createdAt',
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
        currentPage: page!,
        itemsPerPage: pageSize,
      },
      [{ field: sortField!, order: sortOrder! }],
    );
    return {
      list: response.users,
      total: response.userCount,
    };
  };

  const listMap = (list: User[]) =>
    list.map((item) => {
      return {
        ...item,
        fullName: `${item.firstName} ${item.lastName}`,
        createdAt: <DateTime date={item.createdAt!} />,
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
