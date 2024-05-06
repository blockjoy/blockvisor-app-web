import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { blockchainClient } from '@modules/grpc';

export const AdminBlockchain = () => {
  const router = useRouter();
  const { id } = router.query;

  // const handleOpenInApp = () => router.push(`/hosts/${id as string}`);

  const getItem = async () =>
    await blockchainClient.getBlockchain(id as string);

  return (
    <AdminDetail
      getItem={getItem}
      // onOpenInApp={handleOpenInApp}
      detailsName="name"
      // customItems={undefined}
      // ignoreItems={[
      //   'id',
      //   'name',
      //   'ipAddresses',
      //   'memSizeBytes',
      //   'diskSizeBytes',
      //   'orgId',
      //   'orgName',
      //   'managedBy',
      //   'billingAmount',
      // ]}
    />
  );
};
