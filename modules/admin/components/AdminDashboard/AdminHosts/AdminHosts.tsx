import { AdminCard } from '../AdminCard/AdminCard';
import IconHost from '@public/assets/icons/app/Host.svg';

export const AdminHosts = () => {
  return (
    <AdminCard
      name="Hosts"
      icon={<IconHost />}
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
