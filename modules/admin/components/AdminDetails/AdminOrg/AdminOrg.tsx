import { organizationClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import {
  Org,
  OrgServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/org';
import { createAdminUpdateRequest } from '@modules/admin';

export const AdminOrg = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleOpenInApp = () => router.push(`/organizations/${id as string}`);

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    const defaultRequest: OrgServiceUpdateRequest = { id: id as string };
    const request = createAdminUpdateRequest(defaultRequest, properties);
    await organizationClient.updateOrganization(request);
    onSuccess();
  };

  const getItem = async () =>
    await organizationClient.getOrganization(id as string);

  const customItems = (item: Org): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: item.name,
      copyValue: item.name,
      editSettings: {
        field: 'name',
        controlType: 'text',
        defaultValue: item.name,
      },
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
      onSaveChanges={handleSaveChanges}
      detailsName="id"
    />
  );
};
