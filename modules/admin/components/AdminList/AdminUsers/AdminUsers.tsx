import { AdminListView } from '../AdminListView/AdminListView';
import { userClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { pageSize } from '@modules/admin/constants/constants';
import IconUser from '@public/assets/icons/common/Person.svg';

const columns = [
  {
    name: 'name',
    width: '230px',
  },
  {
    name: 'email',
    width: '280px',
  },
  {
    name: 'created',
  },
];

export const AdminUsers = () => {
  const { getTotalUsers: getTotal } = useAdminGetTotals();

  const getList = async (searchTerm?: string, page?: number) => {
    const response = await userClient.listUsers(searchTerm, {
      current_page: page!,
      items_per_page: pageSize,
    });
    return {
      list: response.users,
      total: response.userCount,
    };
  };

  const listMap = (list: any[]) =>
    list.map((item) => {
      return {
        ...item,
        name: `${item.firstName} ${item.lastName}`,
        created: `${formatters.formatDate(
          item.createdAt!,
        )} @ ${formatters.formatDate(item.createdAt!, 'time')}`,
      };
    });

  return (
    <AdminListView
      name="users"
      icon={<IconUser />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
