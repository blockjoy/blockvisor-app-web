import { nodeClient } from '@modules/grpc';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailsTable } from '../AdminDetailsTable/AdminDetailsTable';
import { AdminDetailsHeader } from '../AdminDetailsHeader/AdminDetailsHeader';
import IconNode from '@public/assets/icons/app/Node.svg';

export const AdminNode = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [item, setItem] = useState<Node>();

  const openInApp = () => router.push(`/nodes/${id as string}`);

  useEffect(() => {
    (async () => {
      const response = await nodeClient.getNode(id as string);
      setItem(response);
    })();
  }, []);

  return (
    <>
      <AdminDetailsHeader
        name={name as string}
        icon={<IconNode />}
        detailsName={item?.name!}
        onOpenAppView={openInApp}
      />
      <AdminDetailsTable item={item!} />
    </>
  );
};
