import { nodeClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import IconNode from '@public/assets/icons/app/Node.svg';

const ignoreItems = ['hostId', 'hostOrgId', 'blockchainId', 'orgId'];

export const AdminNode = () => {
  const router = useRouter();
  const { id } = router.query;

  const openInApp = () => router.push(`/nodes/${id as string}`);

  const getItem = async () => await nodeClient.getNode(id as string);

  return (
    <AdminDetail
      getItem={getItem}
      openInApp={openInApp}
      icon={<IconNode />}
      ignoreItems={ignoreItems}
      detailsName="name"
    />
  );
};
