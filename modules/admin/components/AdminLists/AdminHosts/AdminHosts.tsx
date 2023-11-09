import { AdminList } from '../AdminList/AdminList';
import { formatters } from '@shared/utils/formatters';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { pageSize } from '@modules/admin/constants/constants';
import IconHost from '@public/assets/icons/app/Host.svg';

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
  const { getTotalHosts: getTotal } = useAdminGetTotals();

  const getList = async (keyword?: string, page?: number) => {
    const response = await hostClient.listHosts(
      undefined,
      {
        keyword,
      },
      {
        current_page: page!,
        items_per_page: pageSize,
      },
    );
    return {
      list: response.hosts,
      total: response.hostCount,
    };
  };

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
    <AdminList
      name="hosts"
      icon={<IconHost />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
