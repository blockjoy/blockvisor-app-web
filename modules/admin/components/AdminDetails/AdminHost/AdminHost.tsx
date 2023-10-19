import { hostClient } from '@modules/grpc/clients/hostClient';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailsHeader } from '../AdminDetailsHeader/AdminDetailsHeader';
import { AdminDetailsTable } from '../AdminDetailsTable/AdminDetailsTable';
import IconHost from '@public/assets/icons/app/Host.svg';

export const AdminHost = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [item, setItem] = useState<Host>();

  const openInApp = () => router.push(`/hosts/${id as string}`);

  useEffect(() => {
    (async () => {
      const response = await hostClient.getHost(id as string);
      setItem(response);
    })();
  }, []);

  return (
    <>
      <AdminDetailsHeader
        name={name as string}
        icon={<IconHost />}
        detailsName={item?.name!}
        onOpenAppView={openInApp}
      />
      <AdminDetailsTable item={item!} />
    </>
  );
};
