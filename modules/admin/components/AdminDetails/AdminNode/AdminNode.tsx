import { nodeClient, userClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { NextLink, NodeItems } from '@shared/components';
import {
  Node,
  NodeServiceUpdateConfigRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { createAdminUpdateRequest } from '@modules/admin/utils';
import { AdminNodeUpgrade } from './AdminNodeUpgrade/AdminNodeUpgrade';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Currency } from '../../AdminFinancesByHost/Currency/Currency';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';

const ignoreItems = [
  'nodeId',
  'nodeName',
  'displayName',
  'dnsName',
  'orgId',
  'orgName',
  'hostName',
  'hostId',
  'hostOrgId',
  'ip',
  'ipGateway',
  'placement',
  'protocolId',
  'protocolName',
  'blockHeight',
  'autoUpgrade',
  'nodeStatus',
  'reports',
  'tags',
  'createdBy',
  'jobs',
  'config',
  'cost',
];

export const AdminNode = () => {
  const router = useRouter();
  const { id, ip } = router.query;

  const handleOpenInApp = () => router.push(`/nodes/${id as string}`);

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
    node: Node,
  ) => {
    const defaultRequest: NodeServiceUpdateConfigRequest = {
      nodeId: id as string,
      newValues: [],
    };
    const request = createAdminUpdateRequest(defaultRequest, properties);

    if (node.orgId === request.newOrgId) {
      request.newOrgId = undefined;
    }

    await nodeClient.updateNode(request);
    onSuccess();
  };

  const handleDelete = async (onSuccess: VoidFunction) => {
    await nodeClient.deleteNode(id as string);
    onSuccess();
  };

  const getItem = async () => {
    if (ip) {
      const nodeResults = await nodeClient.listNodes(
        undefined,
        { keyword: ip as string },
        { currentPage: 0, itemsPerPage: 1 },
      );
      const { nodeId } = nodeResults.nodes[0];
      router.replace(`/admin?name=nodes&id=${id}`);
      return await nodeClient.getNode(nodeId);
    } else {
      return await nodeClient.getNode(id as string);
    }
  };

  const customItems = async (node: Node): Promise<AdminDetailProperty[]> => {
    const usersResponse = await userClient.listUsers();

    const user = usersResponse.users.find(
      (u) => u.userId === node.createdBy?.resourceId,
    );

    const userName = `${user?.firstName} ${user?.lastName}`;

    return [
      {
        id: 'nodeName',
        label: 'Node Name',
        data: node.nodeName,
        copyValue: node.nodeName,
      },
      {
        id: 'displayName',
        label: 'Display Name',
        data: escapeHtml(node.displayName!),
        copyValue: node.displayName,
        editSettings: {
          field: 'newDisplayName',
          isNumber: false,
          controlType: 'text',
          defaultValue: node.displayName,
        },
      },
      {
        id: 'dnsName',
        label: 'Dns Name',
        data: node.dnsName,
        copyValue: node.dnsName,
      },
      {
        id: 'id',
        label: 'Id',
        data: node.nodeId,
        copyValue: node.nodeId,
      },
      {
        id: 'cost',
        label: 'Cost',
        data: <Currency cents={node.cost?.amount?.amountMinorUnits} />,
      },
      {
        id: 'ip',
        label: 'Ip',
        data: <p>{node.ipAddress}</p>,
        copyValue: node.ipAddress,
      },
      {
        id: 'ipGateway',
        label: 'Ip Gateway',
        data: <p>{node.ipGateway}</p>,
        copyValue: node.ipGateway,
      },
      {
        id: 'status',
        label: 'Node State',
        data: <NodeItems.NodeStatus nodeStatus={node.nodeStatus} />,
      },
      {
        id: 'health',
        label: 'Node Health',
        data: <NodeItems.ProtocolHealth nodeStatus={node.nodeStatus} />,
      },
      {
        id: 'protocolState',
        label: 'Protocol State',
        data: node.nodeStatus?.protocol?.state ? (
          <NodeItems.ProtocolStatus
            nodeStatus={node.nodeStatus}
            jobs={node.jobs}
          />
        ) : (
          '-'
        ),
      },
      {
        id: 'blockheight',
        label: 'Block Height',
        data: node.blockHeight?.toLocaleString('en-US'),
      },
      {
        id: 'protocolName',
        label: 'Protocol Name',
        data: node.protocolName,
        copyValue: node.protocolName,
      },
      {
        id: 'protocolId',
        label: 'Protocol Id',
        data: node.protocolId,
        copyValue: node.protocolId,
      },
      {
        id: 'orgName',
        label: 'Org Name',
        data: (
          <p>
            <NextLink href={`/admin?name=orgs&id=${node.orgId}`}>
              {node.orgName}
            </NextLink>
          </p>
        ),
        editSettings: {
          field: 'newOrgId',
          displayName: 'Organization',
          isNumber: false,
          controlType: 'org',
          defaultValue: node.orgId,
        },
      },
      {
        id: 'orgId',
        label: 'Org Id',
        data: (
          <p>
            <NextLink href={`/admin?name=orgs&id=${node.orgId}`}>
              {node.orgId}
            </NextLink>
          </p>
        ),
        copyValue: node.orgId,
      },
      {
        id: 'hostName',
        label: 'Host Name',
        data: (
          <p>
            <NextLink href={`/admin?name=hosts&id=${node.hostId}`}>
              {node.hostDisplayName}
            </NextLink>
          </p>
        ),
        copyValue: node.hostDisplayName,
      },
      {
        id: 'hostId',
        label: 'Host Id',
        data: (
          <p>
            <NextLink href={`/admin?name=hosts&id=${node.hostId}`}>
              {node.hostId}
            </NextLink>
          </p>
        ),
        copyValue: node.hostId,
      },
      {
        id: 'autoUpgrade',
        label: 'Auto Update',
        data: node.autoUpgrade?.toString(),
        editSettings: {
          field: 'autoUpgrade',
          displayName: 'Auto Update',
          isBoolean: true,
          controlType: 'switch',
          defaultValue: node.autoUpgrade?.toString(),
        },
      },
      {
        id: 'region',
        label: 'Region',
        data: <p>{node.regionName || '-'}</p>,
      },
      {
        id: 'createdByName',
        label: 'Created By Name',
        data:
          node.createdBy?.resourceType === ResourceType.RESOURCE_TYPE_HOST ? (
            <p>
              <NextLink
                href={`/admin?name=hosts&id=${node?.createdBy?.resourceId}`}
              >
                {node.hostDisplayName || node.hostNetworkName || 'No name'}
              </NextLink>
            </p>
          ) : (
            <p>
              <NextLink
                href={`/admin?name=users&id=${node?.createdBy?.resourceId}`}
              >
                {userName || 'No name'}
              </NextLink>
            </p>
          ),
      },
      {
        id: 'createdByEmail',
        label: 'Created By Email',
        data:
          node.createdBy?.resourceType === ResourceType.RESOURCE_TYPE_HOST ? (
            '-'
          ) : (
            <p>
              <NextLink
                href={`/admin?name=users&id=${node?.createdBy?.resourceId}`}
              >
                {user?.email || 'No email'}
              </NextLink>
            </p>
          ),
      },
      {
        id: 'createdById',
        label: 'Launched By Id',
        data: (
          <p>
            <NextLink
              href={`/admin?name=users&id=${node?.createdBy?.resourceId}`}
            >
              {node?.createdBy?.resourceId || 'No Id'}
            </NextLink>
          </p>
        ),
        copyValue: node?.createdBy?.resourceId,
      },
    ];
  };

  return (
    <AdminDetail
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      onSaveChanges={handleSaveChanges}
      onDelete={handleDelete}
      ignoreItems={ignoreItems}
      customItems={customItems}
      additionalHeaderButtons={<AdminNodeUpgrade />}
      detailsName="nodeId"
      metricsKey="ip"
      hasMetrics
    />
  );
};
