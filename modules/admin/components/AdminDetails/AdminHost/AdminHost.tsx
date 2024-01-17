import { hostClient } from '@modules/grpc/clients/hostClient';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import {
  Host,
  HostServiceUpdateRequest,
  ManagedBy,
} from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import {
  createAdminUpdateRequest,
  createDropdownValuesFromEnum,
} from '@modules/admin/utils';
import {
  HostIps,
  HostIpStatus,
  HostManagedBy,
  NextLink,
} from '@shared/components';

export const AdminHost = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleOpenInApp = () => router.push(`/hosts/${id as string}`);

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    const defaultRequest: HostServiceUpdateRequest = { id: id as string };
    const request = createAdminUpdateRequest(defaultRequest, properties);
    await hostClient.updateHost(request);
    onSuccess();
  };

  const getItem = async () => await hostClient.getHost(id as string);

  const customItems = (host: Host & IAdminItem): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: host.name,
      copyValue: host.name,
      editSettings: {
        field: 'name',
        isNumber: false,
        controlType: 'text',
        defaultValue: host.name,
      },
    },
    {
      id: 'id',
      label: 'Id',
      data: host.id,
      copyValue: host.id,
    },
    {
      id: 'managedBy',
      label: 'Managed By',
      data: <HostManagedBy managedBy={host.managedBy} />,
      editSettings: {
        field: 'managedBy',
        isNumber: true,
        controlType: 'dropdown',
        defaultValue: host.managedBy?.toString(),
        dropdownValues: createDropdownValuesFromEnum(ManagedBy, 'MANAGED_BY_'),
      },
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
      id: 'billingAmount',
      label: 'Billing Amount',
      data: host.billingAmount ? `$${host.billingAmount?.amount}` : '-',
    },
    {
      id: 'availableIps',
      label: `Available Ip's`,
      data: <HostIpStatus ipAddresses={host.ipAddresses} />,
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
      onSaveChanges={handleSaveChanges}
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
        'managedBy',
        'billingAmount',
      ]}
    />
  );
};
