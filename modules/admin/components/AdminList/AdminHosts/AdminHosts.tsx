import { AdminListView } from '../AdminListView/AdminListView';
import { useContext, useEffect } from 'react';
import { formatters } from '@shared/utils/formatters';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { AdminContext } from '@modules/admin/components/AdminLayout/AdminLayout';
import IconHost from '@public/assets/icons/app/Host.svg';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';

const columns = [
  {
    name: 'name',
    width: '230px',
  },
  {
    name: 'created',
    width: '230px',
  },
];

export const AdminHosts = () => {
  const adminContext = useContext(AdminContext);

  const { getTotalHosts: getTotal } = useAdminGetTotals();

  const getList = async (searchTerm?: string, page?: number) => {
    const response = await hostClient.listHosts(undefined, undefined, {
      current_page: page!,
      items_per_page: adminContext.listPageSize,
    });
    return {
      list: response.hosts,
      total: response.hostCount,
    };
  };

  useEffect(() => {
    getTotal();
    getList();
  }, []);

  const listMap = (list: any[]) =>
    list.map((item) => {
      return {
        ...item,
        created: `${formatters.formatDate(
          item.createdAt!,
        )} @ ${formatters.formatDate(item.createdAt!, 'time')}`,
      };
    });

  return (
    <AdminListView
      name="hosts"
      icon={<IconHost />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
