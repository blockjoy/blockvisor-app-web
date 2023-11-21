import { userClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { AdminDetailProperty } from '../AdminDetail/AdminDetailTable/AdminDetailTable';
import IconUser from '@public/assets/icons/common/Person.svg';

export const AdminUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const getItem = async () => await userClient.getUser(id as string);

  const customItems = (item: User): AdminDetailProperty[] => [
    {
      id: 'id',
      label: 'Id',
      data: item.id,
      copyValue: item.id,
    },
  ];

  return (
    <AdminDetail
      ignoreItems={['id']}
      customItems={customItems}
      getItem={getItem}
      icon={<IconUser />}
      detailsName="id"
    />
  );
};
