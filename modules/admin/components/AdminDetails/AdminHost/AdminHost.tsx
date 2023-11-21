import { hostClient } from '@modules/grpc/clients/hostClient';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { AdminDetailProperty } from '../AdminDetail/AdminDetailTable/AdminDetailTable';
import IconHost from '@public/assets/icons/app/Host.svg';

export const AdminHost = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleOpenInApp = () => router.push(`/hosts/${id as string}`);

  const getItem = async () => await hostClient.getHost(id as string);

  const customItems = (item: Host): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: item.name,
      copyValue: item.name,
    },
    {
      id: 'id',
      label: 'Id',
      data: item.id,
      copyValue: item.id,
    },
    {
      id: 'memSize',
      label: 'Memory Size',
      data: formatters.formatSize(item.memSizeBytes, 'bytes'),
    },
    {
      id: 'diskSize',
      label: 'Disk Size',
      data: formatters.formatSize(item.diskSizeBytes, 'bytes'),
    },
  ];

  return (
    <AdminDetail
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      icon={<IconHost />}
      detailsName="id"
      customItems={customItems}
      ignoreItems={['id', 'name', 'memSizeBytes', 'diskSizeBytes']}
    />
  );
};
