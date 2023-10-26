import { AdminList } from '../AdminList/AdminList';
import { organizationClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { pageSize } from '@modules/admin/constants/constants';
import IconOrg from '@public/assets/icons/app/Organization.svg';

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

export const AdminOrgs = () => {
  const { getTotalOrgs: getTotal } = useAdminGetTotals();

  const getList = async (keyword?: string, page?: number) => {
    const response = await organizationClient.getOrganizations(
      {
        current_page: page! || 0,
        items_per_page: pageSize,
      },
      `%${keyword!}%`,
      true,
    );
    return {
      list: response.orgs,
      total: response.orgCount,
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
      name="orgs"
      icon={<IconOrg />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
