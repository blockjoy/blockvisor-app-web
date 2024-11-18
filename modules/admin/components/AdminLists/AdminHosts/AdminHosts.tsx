import { AdminList } from '../AdminList/AdminList';
import { formatters } from '@shared/utils/formatters';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { pageSize } from '@modules/admin/constants/constants';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Host, HostSortField } from '@modules/grpc/library/blockjoy/v1/host';
import { DateTime, HostIpStatus, TagList } from '@shared/components';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { AdminHostsTag } from './AdminHostsTag/AdminHostsTag';
import { useState } from 'react';
import { BillingAmount } from '@modules/grpc/library/blockjoy/common/v1/currency';
import { AdminListEditCost } from '../AdminListEditCost/AdminListEditCost';

const columns: AdminListColumn[] = [
  {
    name: 'displayName',
    width: '200px',
    sortField: HostSortField.HOST_SORT_FIELD_DISPLAY_NAME,
    isVisible: true,
  },
  {
    name: 'networkName',
    width: '200px',
    sortField: HostSortField.HOST_SORT_FIELD_NETWORK_NAME,
    isVisible: true,
  },
  {
    name: 'cost',
    width: '100px',
    isVisible: true,
  },
  {
    name: 'tags',
    isVisible: true,
    isRowClickDisabled: true,
    isOverflowHidden: false,
    width: '250px',
  },
  {
    name: 'cost',
    width: '100px',
    isVisible: true,
    isRowClickDisabled: true,
  },
  {
    name: 'ipAddress',
    width: '100px',
    isVisible: true,
  },
  {
    name: 'nodeCount',
    displayName: 'Nodes',
    width: '100px',
    sortField: HostSortField.HOST_SORT_FIELD_NODE_COUNT,
    isVisible: true,
  },
  {
    name: 'diskBytes',
    displayName: 'Disk Bytes',
    width: '120px',
    sortField: HostSortField.HOST_SORT_FIELD_DISK_BYTES,
    isVisible: true,
  },
  {
    name: 'cpuCores',
    displayName: 'Cpu Cores',
    width: '140px',
    sortField: HostSortField.HOST_SORT_FIELD_CPU_CORES,
    isVisible: true,
  },
  {
    name: 'availableIps',
    width: '100px',
    isVisible: true,
  },
  {
    name: 'managedBy',
    width: '100px',
    isVisible: true,
  },
  {
    name: 'bvVersion',
    width: '100px',
    sortField: HostSortField.HOST_SORT_FIELD_BV_VERSION,
    isVisible: true,
  },
  {
    name: 'os',
    width: '100px',
    sortField: HostSortField.HOST_SORT_FIELD_OS,
    isVisible: true,
  },
  {
    name: 'osVersion',
    width: '100px',
    sortField: HostSortField.HOST_SORT_FIELD_OS_VERSION,
    isVisible: true,
  },
  {
    name: 'orgName',
    width: '140px',
    isVisible: true,
  },
  {
    name: 'region',
    width: '100px',
    isVisible: true,
  },
  {
    name: 'createdAt',
    width: '180px',
    sortField: HostSortField.HOST_SORT_FIELD_CREATED_AT,
    isVisible: true,
  },
];

export const AdminHosts = () => {
  const [tagsAdded, setTagsAdded] = useState<AdminTags[]>([]);

  const [tagsRemoved, setTagsRemoved] = useState<AdminTags[]>([]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleIdAllSelected = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleIdSelected = async (hostId: string, isSelected: boolean) => {
    if (!isSelected) {
      setSelectedIds(selectedIds.filter((id) => id !== hostId));
    } else if (!selectedIds?.includes(hostId)) {
      const selectedIdsCopy = [...selectedIds];

      selectedIdsCopy.push(hostId);
      setSelectedIds(selectedIdsCopy);
    }
  };

  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: SortOrder,
  ) => {
    const response = await hostClient.listHosts(
      undefined,
      { keyword },
      { currentPage: page!, itemsPerPage: pageSize },
      [{ field: sortField!, order: sortOrder! }],
    );
    return {
      list: response.hosts,
      total: response.total,
    };
  };

  const handleRemoveTag = async (newTags: string[], hostId?: string) => {
    hostClient.updateHost({
      hostId: hostId!,
      updateTags: {
        overwriteTags: { tags: newTags.map((tag) => ({ name: tag })) },
      },
    });

    const tagsRemovedCopy = [...tagsRemoved];

    const tagIndex = tagsRemovedCopy.findIndex(
      (adminTag) => adminTag.id === hostId,
    );

    if (tagIndex > -1) {
      tagsRemovedCopy[tagIndex] = {
        id: hostId!,
        tags: newTags,
      };
    } else {
      tagsRemovedCopy.push({
        id: hostId!,
        tags: newTags,
      });
    }

    setTagsRemoved(tagsRemovedCopy);
  };

  const handleAddTag = async (newTag: string, hostId?: string) => {
    hostClient.updateHost({
      hostId: hostId!,
      updateTags: { addTag: { name: newTag } },
    });
    const tagsAddedCopy = [...tagsAdded];

    const foundTag = tagsAddedCopy.find((tag) => tag.id === hostId);

    if (foundTag) {
      foundTag.tags.push(newTag);
    } else {
      tagsAddedCopy.push({
        id: hostId!,
        tags: [newTag],
      });
    }

    setTagsAdded(tagsAddedCopy);
  };

  const handleUpdate = async (hostId: string, cost: BillingAmount) => {
    hostClient.updateHost({
      hostId,
      cost,
    });
  };

  const listMap = (list: Host[]) =>
    list.map((host) => {
      return {
        ...host,
        diskBytes: formatters.formatSize(host.diskBytes, 'bytes'),
        availableIps: <HostIpStatus ipAddresses={host.ipAddresses} />,
        region: host.region?.displayName,
        createdAt: <DateTime date={host.createdAt!} />,
        cost: (
          <AdminListEditCost
            id={host.hostId}
            defaultValue={host.cost?.amount?.amountMinorUnits}
            onUpdate={handleUpdate}
          />
        ),
        tags: (
          <TagList
            isInTable
            id={host.hostId}
            tags={host?.tags?.tags?.map((tag) => tag.name)!}
            onRemove={handleRemoveTag}
            onAdd={handleAddTag}
          />
        ),
      };
    });

  return (
    <AdminList
      name="hosts"
      idPropertyName="hostId"
      defaultSortField={HostSortField.HOST_SORT_FIELD_DISPLAY_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
      selectedIds={selectedIds}
      onIdAllSelected={handleIdAllSelected}
      onIdSelected={handleIdSelected}
      setTagsAdded={setTagsAdded}
      setTagsRemoved={setTagsRemoved}
      tagsAdded={tagsAdded}
      tagsRemoved={tagsRemoved}
      additionalHeaderButtons={[AdminHostsTag]}
    />
  );
};
