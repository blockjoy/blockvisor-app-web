import { organizationClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import IconOrg from '@public/assets/icons/app/Organization.svg';

export const AdminOrg = () => {
  const router = useRouter();
  const { id } = router.query;

  const openInApp = () => router.push(`/organizations/${id as string}`);

  const getItem = async () =>
    await organizationClient.getOrganization(id as string);

  return (
    <AdminDetail
      getItem={getItem}
      openInApp={openInApp}
      icon={<IconOrg />}
      detailsName="name"
    />
  );
};
