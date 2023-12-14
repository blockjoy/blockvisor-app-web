import { hostClient } from '@modules/grpc/clients/hostClient';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { AdminDetailProperty } from '../AdminDetail/AdminDetailTable/AdminDetailTable';
import { HostIps, HostStatus, NextLink } from '@shared/components';

export const AdminHost = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleOpenInApp = () => router.push(`/hosts/${id as string}`);

  const getItem = async () => await hostClient.getHost(id as string);

  const customItems = (host: Host & IAdminItem): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: host.name,
      copyValue: host.name,
    },
    {
      id: 'id',
      label: 'Id',
      data: host.id,
      copyValue: host.id,
    },
    {
      id: 'status',
      label: 'Status',
      data: <HostStatus hasBorder={false} />,
    },
    {
      id: 'memSize',
      label: 'Memory Size',
      data: formatters.formatSize(host.memSizeBytes, 'bytes'),
    },
    {
      id: 'diskSize',
      label: 'Disk Size',
      data: formatters.formatSize(host.diskSizeBytes, 'bytes'),
    },
    {
      id: 'availableIps',
      label: `Available Ip's`,
      data: host?.ipAddresses.filter((ip) => !ip.assigned).length,
    },
    {
      id: 'ipAddresses',
      label: 'Ip Addresses',
      data: <HostIps ipAddresses={host.ipAddresses} orgId={host.orgId} />,
    },
    {
      id: 'orgName',
      label: 'Org Name',
      data: (
        <p>
          <NextLink href={`/admin?name=orgs&id=${host.orgId}`}>
            {host.orgName}
          </NextLink>
        </p>
      ),
    },
    {
      id: 'orgId',
      label: 'Org Id',
      data: (
        <p>
          <NextLink href={`/admin?name=orgs&id=${host.orgId}`}>
            {host.orgId}
          </NextLink>
        </p>
      ),
      copyValue: host.orgId,
    },
  ];

  return (
    <AdminDetail
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      detailsName="id"
      customItems={customItems}
      ignoreItems={[
        'id',
        'name',
        'ipAddresses',
        'memSizeBytes',
        'diskSizeBytes',
        'orgId',
        'orgName',
      ]}
    />
  );
};
