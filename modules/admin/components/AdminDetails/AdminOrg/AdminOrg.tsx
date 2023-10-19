import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailsTable } from '../AdminDetailsTable/AdminDetailsTable';
import { AdminDetailsHeader } from '../AdminDetailsHeader/AdminDetailsHeader';
import IconOrg from '@public/assets/icons/app/Organization.svg';

export const AdminOrg = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [item, setItem] = useState<Org>();

  const openInApp = () => router.push(`/organizations/${id as string}`);

  useEffect(() => {
    (async () => {
      const response = await organizationClient.getOrganization(id as string);
      setItem(response);
    })();
  }, []);

  return (
    <>
      <AdminDetailsHeader
        name={name as string}
        icon={<IconOrg />}
        detailsName={item?.name!}
        onOpenAppView={openInApp}
      />
      <AdminDetailsTable item={item!} />
    </>
  );
};
