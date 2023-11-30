import { organizationClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { AdminDetailProperty } from '../AdminDetail/AdminDetailTable/AdminDetailTable';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import IconOrg from '@public/assets/icons/app/Organization.svg';

export const AdminOrg = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleOpenInApp = () => router.push(`/organizations/${id as string}`);

  const getItem = async () =>
    await organizationClient.getOrganization(id as string);

  const customItems = (item: Org): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: item.name,
      copyValue: item.name,
    },
    {
      id: 'id',
      label: 'Id',
      data: item.id,
      copyValue: item.id,
    },
  ];

  return (
    <AdminDetail
      ignoreItems={['id', 'name', 'members']}
      customItems={customItems}
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      icon={<IconOrg />}
      detailsName="id"
    />
  );
};
