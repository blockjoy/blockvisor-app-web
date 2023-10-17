import { AdminCard } from '../AdminCard/AdminCard';
import IconOrganization from '@public/assets/icons/app/Organization.svg';

export const AdminOrgs = () => {
  return (
    <AdminCard
      name="Orgs"
      icon={<IconOrganization />}
      total="200"
      list={[]}
      listTotal={0}
      listPage={0}
      columns={[]}
      onSearch={(search: string) => console.log('onSearch', search)}
      onPageChanged={(page: number) => console.log('onPageChanged', page)}
    />
  );
};
