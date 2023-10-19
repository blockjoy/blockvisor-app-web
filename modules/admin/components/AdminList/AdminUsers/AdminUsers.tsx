import { AdminListView } from '../AdminListView/AdminListView';
import { userClient } from '@modules/grpc';
import { useContext } from 'react';
import { formatters } from '@shared/utils/formatters';
import { AdminContext } from '@modules/admin/components/AdminLayout/AdminLayout';
import IconUser from '@public/assets/icons/common/Person.svg';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';

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
  const adminContext = useContext(AdminContext);

  const { getTotalUsers: getTotal } = useAdminGetTotals();

  const getList = async (searchTerm?: string, page?: number) => {
    const response = await userClient.listUsers(searchTerm, {
      current_page: page!,
      items_per_page: adminContext.listPageSize,
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
