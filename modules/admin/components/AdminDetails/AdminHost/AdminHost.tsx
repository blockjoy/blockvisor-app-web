import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import {
  Host,
  HostServiceUpdateHostRequest,
} from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { createAdminUpdateRequest } from '@modules/admin/utils';
import { HostIps, HostIpStatus, NextLink, TagList } from '@shared/components';
import { Currency } from '../../AdminFinancesByHost/Currency/Currency';

export const AdminHost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleOpenInApp = () => router.push(`/hosts/${id as string}`);

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
    onError: VoidFunction,
  ) => {
    const defaultRequest: HostServiceUpdateHostRequest = {
      hostId: id as string,
    };
    const request: HostServiceUpdateHostRequest = createAdminUpdateRequest(
      defaultRequest,
      properties,
    );
    try {
      await hostClient.updateHost(request);
      onSuccess();
    } catch (err) {
      onError();
    }
  };

  const handleDelete = async (onSuccess: VoidFunction) => {
    await hostClient.deleteHost(id as string);
    onSuccess();
  };

  const getItem = async () => await hostClient.getHost(id as string);

  const handleAddTag = async (nextTag: string, id?: string) => {
    try {
      await hostClient.updateHost({
        hostId: id!,
        updateTags: {
          addTag: { name: nextTag },
        },
      });
      toast.success('Host Tags Updated');
      setShouldRefresh(true);
    } catch (err) {
      toast.error('Error Updating Host');
    }
  };

  const handleRemoveTag = async (nextTags: string[], id?: string) => {
    try {
      await hostClient.updateHost({
        hostId: id!,
        updateTags: {
          overwriteTags: { tags: nextTags.map((tag) => ({ name: tag })) },
        },
      });
      toast.success('Host Tags Updated');
      setShouldRefresh(true);
    } catch (err) {
      toast.error('Error Updating Host');
    }
  };

  const customItems = (host: Host): AdminDetailProperty[] => [
    {
      id: 'networkName',
      label: 'Network Name',
      data: host.networkName,
      copyValue: host.networkName,
    },
    {
      id: 'displayName',
      label: 'Display Name',
      data: host.displayName,
      copyValue: host.displayName,
      editSettings: {
        field: 'displayName',
        isNumber: false,
        controlType: 'text',
        defaultValue: host.displayName,
      },
    },
    {
      id: 'id',
      label: 'Id',
      data: host.hostId,
      copyValue: host.hostId,
    },
    {
      id: 'cost',
      label: 'Cost',
      data: <Currency cents={host.cost?.amount?.amountMinorUnits!} />,
    },
    {
      id: 'memSize',
      label: 'Memory Size',
      data: formatters.formatSize(host.memoryBytes, 'bytes'),
    },
    {
      id: 'diskSize',
      label: 'Disk Size',
      data: formatters.formatSize(host.diskBytes, 'bytes'),
    },
    {
      id: 'tags',
      label: 'Tags',
      data: (
        <TagList
          key={uuidv4()}
          id={host.hostId}
          tags={host.tags?.tags.map((tag) => tag.name)!}
          noPadding
          onAdd={handleAddTag}
          onRemove={handleRemoveTag}
        />
      ),
    },
    {
      id: 'availableIps',
      label: `Available Ip's`,
      data: <HostIpStatus ipAddresses={host.ipAddresses} />,
    },
    {
      id: 'ipAddresses',
      label: 'Ip Addresses',
      data: <HostIps ipAddresses={host.ipAddresses} />,
    },
    {
      id: 'orgName',
      label: 'Org Name',
      data: host.orgName ? (
        <p>
          <NextLink href={`/admin?name=orgs&id=${host.orgId}`}>
            {host.orgName}
          </NextLink>
        </p>
      ) : (
        '-'
      ),
    },
    {
      id: 'orgId',
      label: 'Org Id',
      data: host.orgId ? (
        <p>
          <NextLink href={`/admin?name=orgs&id=${host.orgId}`}>
            {host.orgId}
          </NextLink>
        </p>
      ) : (
        '-'
      ),
      copyValue: host.orgId,
    },
  ];

  return (
    <AdminDetail
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      onSaveChanges={handleSaveChanges}
      onDelete={handleDelete}
      detailsName="hostId"
      metricsKey="name"
      hasMetrics
      hasLogs
      shouldRefresh={shouldRefresh}
      onRefreshed={() => setShouldRefresh(false)}
      customItems={customItems}
      ignoreItems={[
        'hostId',
        'displayName',
        'networkName',
        'ipAddresses',
        'memSizeBytes',
        'diskSizeBytes',
        'orgId',
        'orgName',
        'managedBy',
        'billingAmount',
        'tags',
      ]}
    />
  );
};
