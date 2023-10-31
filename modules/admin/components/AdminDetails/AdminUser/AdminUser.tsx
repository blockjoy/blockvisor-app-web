import { userClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import IconUser from '@public/assets/icons/common/Person.svg';

export const AdminUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const getItem = async () => await userClient.getUser(id as string);

  return (
    <AdminDetail getItem={getItem} icon={<IconUser />} detailsName="email" />
  );
};
