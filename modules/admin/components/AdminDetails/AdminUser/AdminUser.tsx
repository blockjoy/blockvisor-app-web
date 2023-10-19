import { userClient } from '@modules/grpc';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailsTable } from '../AdminDetailsTable/AdminDetailsTable';
import { AdminDetailsHeader } from '../AdminDetailsHeader/AdminDetailsHeader';
import IconUser from '@public/assets/icons/common/Person.svg';

export const AdminUser = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [item, setItem] = useState<User>();

  useEffect(() => {
    (async () => {
      const response = await userClient.getUser(id as string);
      setItem(response);
    })();
  }, []);

  return (
    <>
      <AdminDetailsHeader
        name={name as string}
        icon={<IconUser />}
        detailsName={`${item?.firstName} ${item?.lastName}`}
      />
      <AdminDetailsTable item={item!} />
    </>
  );
};
