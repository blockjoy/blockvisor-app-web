import { userClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import {
  User,
  UserServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/user';
import { createAdminUpdateRequest } from '@modules/admin/utils';

export const AdminUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const getItem = async () => await userClient.getUser(id as string);

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    const defaultRequest: UserServiceUpdateRequest = { id: id as string };
    const request = createAdminUpdateRequest(defaultRequest, properties);
    await userClient.updateUser(request);
    onSuccess();
  };

  const customItems = (item: User): AdminDetailProperty[] => [
    {
      id: 'id',
      label: 'Id',
      data: item.id,
      copyValue: item.id,
    },
    {
      id: 'firstName',
      label: 'First Name',
      data: item.firstName,
      editSettings: {
        field: 'firstName',
        isNumber: false,
        controlType: 'text',
        defaultValue: item.firstName,
      },
    },
    {
      id: 'lastName',
      label: 'Last Name',
      data: item.lastName,
      editSettings: {
        field: 'lastName',
        isNumber: false,
        controlType: 'text',
        defaultValue: item.lastName,
      },
    },
  ];

  return (
    <AdminDetail
      ignoreItems={['id', 'firstName', 'lastName']}
      customItems={customItems}
      getItem={getItem}
      detailsName="id"
      onSaveChanges={handleSaveChanges}
    />
  );
};
