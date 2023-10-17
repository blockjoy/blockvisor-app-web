import { AdminCard } from '../AdminCard/AdminCard';
import IconNode from '@public/assets/icons/app/Node.svg';

export const AdminNodes = () => {
  return (
    <AdminCard
      name="Nodes"
      icon={<IconNode />}
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
