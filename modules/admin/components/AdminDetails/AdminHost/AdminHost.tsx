import { hostClient } from '@modules/grpc/clients/hostClient';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import IconHost from '@public/assets/icons/app/Host.svg';

export const AdminHost = () => {
  const router = useRouter();
  const { id } = router.query;

  const openInApp = () => router.push(`/hosts/${id as string}`);

  const getItem = async () => await hostClient.getHost(id as string);

  return (
    <AdminDetail
      getItem={getItem}
      openInApp={openInApp}
      icon={<IconHost />}
      detailsName="name"
    />
  );
};
