import { AdminListView } from '../AdminListView/AdminListView';
import { organizationClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { useContext } from 'react';
import { AdminContext } from '@modules/admin/components/AdminLayout/AdminLayout';
import IconOrg from '@public/assets/icons/app/Organization.svg';
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

export const AdminOrgs = () => {
  const adminContext = useContext(AdminContext);

  const { getTotalOrgs: getTotal } = useAdminGetTotals();

  const getList = async (searchTerm?: string, page?: number) => {
    const response = await organizationClient.getOrganizations(undefined, {
      current_page: page!,
      items_per_page: adminContext.listPageSize,
    });
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
    <AdminListView
      name="orgs"
      icon={<IconOrg />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
