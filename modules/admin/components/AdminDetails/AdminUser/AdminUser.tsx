import { userClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import {
  User,
  UserServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/user';
import { createAdminUpdateRequest } from '@modules/admin/utils';
import { useEffect, useState } from 'react';
import { AdminHeaderButton } from '../../AdminHeader/AdminHeaderButton/AdminHeaderButton';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import { toast } from 'react-toastify';
import { AdminUserNodes } from './AdminUserNodes/AdminUserNodes';

export const AdminUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const getItem = async () => await userClient.getUser(id as string);

  const [userSettings, setUserSettings] = useState<Record<string, string>>();

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    const defaultRequest: UserServiceUpdateRequest = { userId: id as string };
    const request = createAdminUpdateRequest(defaultRequest, properties);
    await userClient.updateUser(request);
    onSuccess();
  };

  const handleDeleteSettings = async () => {
    await userClient.deleteSettings(id as string, 'admin');
    await userClient.deleteSettings(id as string, 'organization');
    toast.success('Settings deleted');
  };

  useEffect(() => {
    (async () => {
      const settings = await userClient.getSettings(id as string);
      if (settings.admin) {
        setUserSettings(JSON.parse(settings.admin));
      }
    })();
  }, []);

  const customItems = (item: User): AdminDetailProperty[] => [
    {
      id: 'userId',
      label: 'User Id',
      data: item.userId,
      copyValue: item.userId,
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
    {
      id: 'nodes',
      label: 'Nodes',
      data: <AdminUserNodes userId={item.id} />,
    },
    {
      id: 'userSettings',
      label: 'Admin Settings',
      data: userSettings ? (
        <pre>
          <code style={{ wordWrap: 'break-word' }}>
            {JSON.stringify(userSettings, undefined, 2)}
          </code>
        </pre>
      ) : (
        '{}'
      ),
    },
  ];

  return (
    <AdminDetail
      ignoreItems={['userId', 'firstName', 'lastName']}
      customItems={customItems}
      getItem={getItem}
      additionalHeaderButtons={
        <AdminHeaderButton
          icon={<IconDelete />}
          onClick={handleDeleteSettings}
          tooltip="Delete Settings"
        />
      }
      detailsName="userId"
      onSaveChanges={handleSaveChanges}
    />
  );
};
