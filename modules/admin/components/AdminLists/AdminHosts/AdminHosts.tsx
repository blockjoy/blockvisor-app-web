import { AdminList } from '../AdminList/AdminList';
import { formatters } from '@shared/utils/formatters';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { pageSize } from '@modules/admin/constants/constants';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Host, HostSortField } from '@modules/grpc/library/blockjoy/v1/host';
import {
  DateTime,
  HostIpStatus,
  HostManagedBy,
  TagList,
} from '@shared/components';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { useState } from 'react';

const columns: AdminListColumn[] = [
  {
    name: 'name',
    width: '280px',
    sortField: HostSortField.HOST_SORT_FIELD_HOST_NAME,
    isVisible: true,
  },
  {
    name: 'tags',
    isVisible: true,
    isRowClickDisabled: true,
  },
  {
    name: 'ip',
    width: '180px',
    isVisible: false,
  },
  {
    name: 'nodeCount',
    displayName: 'Nodes',
    width: '100px',
    sortField: HostSortField.HOST_SORT_FIELD_NODE_COUNT,
    isVisible: true,
  },
  {
    name: 'diskSizeBytes',
    displayName: 'Disk Size',
    width: '130px',
    sortField: HostSortField.HOST_SORT_FIELD_DISK_SIZE_BYTES,
    isVisible: true,
  },
  {
    name: 'cpuCount',
    displayName: 'Cpu Count',
    width: '150px',
    sortField: HostSortField.HOST_SORT_FIELD_CPU_COUNT,
    isVisible: true,
  },
  {
    name: 'availableIps',
    width: '150px',
    isVisible: true,
  },
  {
    name: 'managedBy',
    width: '150px',
    isVisible: true,
  },
  {
    name: 'version',
    width: '150px',
    sortField: HostSortField.HOST_SORT_FIELD_VERSION,
    isVisible: true,
  },
  {
    name: 'os',
    width: '150px',
    sortField: HostSortField.HOST_SORT_FIELD_OS,
    isVisible: true,
  },
  {
    name: 'osVersion',
    width: '150px',
    sortField: HostSortField.HOST_SORT_FIELD_OS_VERSION,
    isVisible: true,
  },
  {
    name: 'orgName',
    width: '230px',
    isVisible: true,
  },
  {
    name: 'region',
    width: '230px',
    isVisible: true,
  },
  {
    name: 'createdAt',
    width: '230px',
    sortField: HostSortField.HOST_SORT_FIELD_CREATED_AT,
    isVisible: true,
  },
];

export const AdminHosts = () => {
  const [updatedTags, setUpdatedTags] = useState<AdminTags[]>([]);

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
      total: response.hostCount,
    };
  };

  const handleRemoveTag = async (hostId: string, newTags: string[]) => {
    hostClient.updateHost({
      id: hostId,
      updateTags: {
        overwriteTags: { tags: newTags.map((tag) => ({ name: tag })) },
      },
    });

    const updatedTagsCopy = [...updatedTags];

    const tagIndex = updatedTagsCopy.findIndex(
      (adminTag) => adminTag.id === hostId,
    );

    if (tagIndex > -1) {
      updatedTagsCopy[tagIndex] = {
        id: hostId,
        tags: newTags,
      };
    } else {
      updatedTagsCopy.push({
        id: hostId,
        tags: newTags,
      });
    }

    setUpdatedTags(updatedTagsCopy);
  };

  const handleAddTag = async (hostId: string, newTag: string) => {
    hostClient.updateHost({
      id: hostId,
      updateTags: { addTag: { name: newTag } },
    });
    const updatedTagsCopy = [...updatedTags];

    const foundTag = updatedTagsCopy.find((tag) => tag.id === hostId);

    if (foundTag) {
      foundTag.tags.push(newTag);
    } else {
      updatedTagsCopy.push({
        id: hostId,
        tags: [newTag],
      });
    }

    setUpdatedTags(updatedTagsCopy);
  };

  const listMap = (list: Host[]) =>
    list.map((host) => {
      return {
        ...host,
        diskSizeBytes: formatters.formatSize(host.diskSizeBytes, 'bytes'),
        availableIps: <HostIpStatus ipAddresses={host.ipAddresses} />,
        managedBy: <HostManagedBy managedBy={host.managedBy} />,
        createdAt: <DateTime date={host.createdAt!} />,
        tags: (
          <TagList
            id={host.id}
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
      defaultSortField={HostSortField.HOST_SORT_FIELD_HOST_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
      updatedTags={updatedTags}
    />
  );
};
