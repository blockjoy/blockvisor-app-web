import { userClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import {
  User,
  UserServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/user';
import { createAdminUpdateRequest } from '@modules/admin/utils';
// import { useEffect, useState } from 'react';
// import { AdminHeaderButton } from '../../AdminHeader/AdminHeaderButton/AdminHeaderButton';
// import IconDelete from '@public/assets/icons/common/Trash.svg';
// import { toast } from 'react-toastify';

export const AdminUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const getItem = async () => await userClient.getUser(id as string);

  // const [userSettings, setUserSettings] = useState<Record<string, string>>();

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    const defaultRequest: UserServiceUpdateRequest = { id: id as string };
    const request = createAdminUpdateRequest(defaultRequest, properties);
    await userClient.updateUser(request);
    onSuccess();
  };

  // const handleDeleteSettings = async () => {
  //   await userClient.deleteSettings(id as string, 'admin');
  //   toast.success('Settings deleted');
  // };

  // useEffect(() => {
  //   (async () => {
  //     const settings = await userClient.getSettings(id as string);
  //     console.log('settings', settings);
  //     setUserSettings(settings);
  //   })();
  // }, []);

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
    // {
    //   id: 'userSettings',
    //   label: 'Settings',
    //   data: (
    //     <pre>
    //       <code style={{ wordWrap: 'break-word' }}>
    //         {JSON.stringify(userSettings, undefined, 2)}
    //       </code>
    //     </pre>
    //   ),
    // },
  ];

  return (
    <AdminDetail
      ignoreItems={['id', 'firstName', 'lastName']}
      customItems={customItems}
      getItem={getItem}
      // additionalHeaderButtons={
      //   <AdminHeaderButton
      //     icon={<IconDelete />}
      //     onClick={handleDeleteSettings}
      //     tooltip="Delete Settings"
      //   />
      // }
      detailsName="id"
      onSaveChanges={handleSaveChanges}
    />
  );
};
