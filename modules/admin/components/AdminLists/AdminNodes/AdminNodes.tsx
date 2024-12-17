import { AdminList } from '../AdminList/AdminList';
import { protocolClient, nodeClient, userClient } from '@modules/grpc';
import { DateTime, NodeStatus } from '@shared/components';
import {
  AdminNodesFilterProtocol,
  AdminNodesFilterOrg,
  AdminNodesFilterUser,
  AdminNodesFilterHost,
  AdminNodesFilterRegion,
  AdminNodesFilterIp,
  AdminNodesFilterVariant,
  AdminNodesFilterVersion,
  AdminNodesFilterStatus,
} from '@modules/admin/components';
import { AdminNodesUpgrade } from './AdminNodesUpgrade/AdminNodesUpgrade';
import { AdminNodesOrgAssign } from './AdminNodesOrgAssign/AdminNodesOrgAssign';
import { AdminNodesActions } from './AdminNodesActions/AdminNodesActions';
import { pageSize } from '@modules/admin/constants/constants';
import { Node, NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { capitalized, createAdminNodeFilters } from '@modules/admin';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { useState } from 'react';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { AdminListEditCost } from '../AdminListEditCost/AdminListEditCost';
import { BillingAmount } from '@modules/grpc/library/blockjoy/common/v1/currency';
import { User } from '@modules/grpc/library/blockjoy/v1/user';

const columns: AdminListColumn[] = [
  {
    name: 'displayName',
    width: '200px',
    sortField: NodeSortField.NODE_SORT_FIELD_DISPLAY_NAME,
    isVisible: true,
  },
  {
    name: 'nodeName',
    width: '200px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    isVisible: false,
  },
  {
    name: 'dnsName',
    width: '200px',
    sortField: NodeSortField.NODE_SORT_FIELD_DNS_NAME,
    isVisible: false,
  },
  {
    name: 'nodeState',
    displayName: 'Node State',
    width: '200px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_STATE,
    isVisible: true,
    filterComponent: AdminNodesFilterStatus,
    filterDropdownMinWidth: 160,
  },
  {
    name: 'protocolHealth',
    displayName: 'Protocol Health',
    width: '160px',
    sortField: NodeSortField.NODE_SORT_FIELD_PROTOCOL_HEALTH,
    isVisible: true,
  },
  {
    name: 'protocolState',
    displayName: 'Protocol State',
    width: '160px',
    sortField: NodeSortField.NODE_SORT_FIELD_PROTOCOL_STATE,
    isVisible: true,
  },
  {
    name: 'cost',
    width: '100px',
    isRowClickDisabled: true,
  },
  {
    name: 'host',
    width: '200px',
    // sortField: NodeSortField.NODE_SORT_FIELD_HOST_NAME,
    isVisible: true,
    filterComponent: AdminNodesFilterHost,
    filterDropdownMaxWidth: 250,
    filterDropdownMinWidth: 220,
  },
  {
    name: 'blockHeight',
    width: '190px',
    isVisible: false,
    sortField: NodeSortField.NODE_SORT_FIELD_BLOCK_HEIGHT,
  },
  {
    name: 'protocolName',
    displayName: 'protocol',
    width: '140px',
    isVisible: true,
    filterComponent: AdminNodesFilterProtocol,
    filterDropdownMinWidth: 200,
  },
  {
    name: 'variant',
    width: '140px',
    isVisible: true,
    filterComponent: AdminNodesFilterVariant,
    filterDropdownMinWidth: 160,
    filterDropdownMaxWidth: 200,
  },
  {
    name: 'semanticVersion',
    displayName: 'Version',
    width: '100px',
    isVisible: true,
    filterComponent: AdminNodesFilterVersion,
    filterDropdownMinWidth: 190,
    filterDropdownMaxWidth: 220,
  },
  {
    name: 'ipAddress',
    width: '140px',
    isVisible: false,
    filterComponent: AdminNodesFilterIp,
    filterDropdownMinWidth: 170,
  },
  {
    name: 'ipGateway',
    width: '140px',
    isVisible: false,
  },
  {
    name: 'region',
    width: '140px',
    isVisible: true,
  },
  {
    name: 'address',
    width: '140px',
    displayName: 'Node Address',
    isVisible: false,
  },
  {
    name: 'orgName',
    displayName: 'Org',
    width: '100px',
    isVisible: true,
    filterComponent: AdminNodesFilterOrg,
    filterDropdownMinWidth: 200,
  },
  {
    name: 'createdAt',
    displayName: 'Launched On',
    width: '180px',
    sortField: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    isVisible: true,
  },
  {
    name: 'createdBy',
    displayName: 'Launched By',
    width: '140px',
    isVisible: true,
    filterComponent: AdminNodesFilterUser,
    filterDropdownMaxWidth: 200,
    filterDropdownMinWidth: 160,
  },
];

export const AdminNodes = () => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: SortOrder,
    filters?: AdminListColumn[],
  ) => {
    if (!users.length) {
      const usersResponse = await userClient.listUsers();
      setUsers(usersResponse.users);
    }

    if (!protocols?.length) {
      const protocolsResponse = await protocolClient.listProtocols();
      setProtocols(protocolsResponse.protocols);
    }

    const sort =
      page === -1 ? undefined : [{ field: sortField!, order: sortOrder! }];

    try {
      const response = await nodeClient.listNodes(
        undefined,
        {
          keyword,
          ...createAdminNodeFilters(filters!),
        },
        {
          currentPage: page === -1 ? 0 : page!,
          itemsPerPage: page === -1 ? 50000 : pageSize,
        },
        sort,
      );

      return {
        list: response.nodes,
        total: response.total,
      };
    } catch (err) {
      return {
        list: [],
        total: 0,
      };
    }
  };

  const handleUpdate = async (nodeId: string, cost: BillingAmount) => {
    nodeClient.updateNode({
      nodeId,
      cost,
      newValues: [],
    });
  };

  const listMap = (list: Node[]) =>
    list.map((node) => {
      const user = users.find((u) => u.userId === node.createdBy?.resourceId);
      const createdBy = `${user?.firstName} ${user?.lastName}`;
      return {
        ...node,
        variant: node.versionKey?.variantKey,
        nodeState: (
          <NodeStatus status={node.nodeStatus?.state!} hasBorder={false} />
        ),
        protocolHealth: node.nodeStatus?.protocol?.health ? (
          <NodeStatus
            status={node.nodeStatus?.protocol?.health!}
            type="protocol"
            hasBorder={false}
          />
        ) : (
          '-'
        ),
        protocolState: node.nodeStatus?.protocol?.state ? (
          <NodeStatus
            view="simple"
            protocolStatus={node.nodeStatus?.protocol?.state}
            hasBorder={false}
            jobs={node.jobs}
          />
        ) : (
          '-'
        ),
        region: node.regionName,
        createdAt: <DateTime date={node.createdAt!} />,
        createdBy,
        host: node.hostDisplayName || node.hostNetworkName,
        cost: (
          <AdminListEditCost
            id={node.nodeId}
            defaultValue={node.cost?.amount?.amountMinorUnits}
            onUpdate={handleUpdate}
          />
        ),
        protocolName: capitalized(node.versionKey?.protocolKey!),
        protocolState: node.nodeStatus?.protocol?.state
          ? capitalized(node.nodeStatus?.protocol?.state!)
          : '-',
      };
    });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleIdAllSelected = (ids: string[]) => setSelectedIds(ids);

  const handleIdSelected = async (nodeId: string, isSelected: boolean) => {
    if (!isSelected) {
      setSelectedIds(selectedIds.filter((id) => id !== nodeId));
    } else if (!selectedIds?.includes(nodeId)) {
      const selectedIdsCopy = [...selectedIds];

      selectedIdsCopy.push(nodeId);
      setSelectedIds(selectedIdsCopy);
    }
  };

  return (
    <AdminList
      name="nodes"
      idPropertyName="nodeId"
      defaultSortField={NodeSortField.NODE_SORT_FIELD_CREATED_AT}
      defaultSortOrder={SortOrder.SORT_ORDER_DESCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
      selectedIds={selectedIds}
      protocols={protocols}
      users={users}
      onIdSelected={handleIdSelected}
      onIdAllSelected={handleIdAllSelected}
      additionalHeaderButtons={[
        AdminNodesUpgrade,
        AdminNodesOrgAssign,
        AdminNodesActions,
      ]}
    />
  );
};
