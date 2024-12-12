import { nodeClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { NextLink, NodeFirewall, NodeStatus } from '@shared/components';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { capitalized } from '@modules/admin/utils/capitalized';
import {
  Node,
  NodeServiceUpdateConfigRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { createAdminUpdateRequest } from '@modules/admin/utils';
import { AdminNodeUpgrade } from './AdminNodeUpgrade/AdminNodeUpgrade';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Currency } from '../../AdminFinancesByHost/Currency/Currency';

const ignoreItems = [
  'id',
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
  'blockchainId',
  'blockchainName',
  'blockHeight',
  'selfUpdate',
  'status',
  'containerStatus',
  'syncStatus',
  'stakingStatus',
  'createdBy',
  'properties',
  'allowIps',
  'denyIps',
  'nodeType',
  'jobs',
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
      ids: [id as string],
    };
    const request = createAdminUpdateRequest(defaultRequest, properties);
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
      const { id } = nodeResults.nodes[0];
      router.replace(`/admin?name=nodes&id=${id}`);
      return await nodeClient.getNode(id);
    } else {
      return await nodeClient.getNode(id as string);
    }
  };

  const customItems = (node: Node): AdminDetailProperty[] => [
    {
      id: 'nodeName',
      label: 'Node Name',
      data: node.nodeName,
      copyValue: node.nodeName,
    },
    {
      id: 'displayName',
      label: 'Display Name',
      data: escapeHtml(node.displayName),
      copyValue: node.displayName,
      editSettings: {
        field: 'displayName',
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
      data: node.id,
      copyValue: node.id,
    },
    {
      id: 'cost',
      label: 'Cost',
      data: <Currency cents={node.cost?.amount?.amountMinorUnits} />,
    },
    {
      id: 'ip',
      label: 'Ip',
      data: <p>{node.ip}</p>,
      copyValue: node.ip,
    },
    {
      id: 'ipGateway',
      label: 'Ip Gateway',
      data: <p>{node.ipGateway}</p>,
      copyValue: node.ipGateway,
    },
    {
      id: 'status',
      label: 'Node Status',
      data: <NodeStatus hasBorder={false} status={node.status}></NodeStatus>,
    },
    {
      id: 'containerStatus',
      label: 'Container Status',
      data: (
        <NodeStatus
          hasBorder={false}
          status={node.containerStatus}
          type="container"
        ></NodeStatus>
      ),
    },
    {
      id: 'syncStatus',
      label: 'Sync Status',
      data: (
        <NodeStatus
          hasBorder={false}
          status={node.syncStatus}
          type="sync"
        ></NodeStatus>
      ),
    },
    {
      id: 'blockheight',
      label: 'Block Height',
      data: node.blockHeight?.toLocaleString('en-US'),
    },
    {
      id: 'blockchainName',
      label: 'Blockchain Name',
      data: node.blockchainName,
      copyValue: node.blockchainName,
    },
    {
      id: 'blockchainId',
      label: 'Blockchain Id',
      data: node.blockchainId,
      copyValue: node.blockchainId,
    },
    {
      id: 'nodeType',
      label: 'Node Type',
      data: capitalized(convertNodeTypeToName(node.nodeType)),
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
            {node.hostName}
          </NextLink>
        </p>
      ),
      copyValue: node.hostName,
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
      id: 'selfUpdate',
      label: 'Auto Update',
      data: node.selfUpdate?.toString(),
      editSettings: {
        field: 'selfUpdate',
        displayName: 'Auto Update',
        isBoolean: true,
        controlType: 'switch',
        defaultValue: node.selfUpdate?.toString(),
      },
    },
    {
      id: 'firewallRules',
      label: 'Firewall Rules',
      data:
        node.allowIps.length || node.denyIps.length ? (
          <NodeFirewall allowIps={node.allowIps} denyIps={node.denyIps} />
        ) : (
          '-'
        ),
    },
    // {
    //   id: 'allowIps',
    //   label: 'Allow Ips',
    //   data: node.allowIps,
    //   isHidden: true,
    //   editSettings: {
    //     field: 'allowIps',
    //     displayName: 'Allow Ips',
    //     isArray: true,
    //     controlType: 'firewall',
    //     defaultValue: JSON.stringify(node.allowIps),
    //   },
    // },
    // {
    //   id: 'denyIps',
    //   label: 'Deny Ips',
    //   data: node.denyIps,
    //   isHidden: false,
    //   editSettings: {
    //     field: 'denyIps',
    //     displayName: 'Deny Ips',
    //     isArray: true,
    //     controlType: 'firewall',
    //     defaultValue: JSON.stringify(node.denyIps),
    //   },
    {
      id: 'region',
      label: 'Region',
      data: <p>{node.placement?.scheduler?.region || '-'}</p>,
    },
    {
      id: 'createdByName',
      label: 'Launched By Name',
      data: (
        <p>
          <NextLink
            href={`/admin?name=users&id=${node?.createdBy?.resourceId}`}
          >
            {node?.createdBy?.name || 'No name'}
          </NextLink>
        </p>
      ),
    },
    {
      id: 'createdByEmail',
      label: 'Launched By Email',
      data: (
        <p>
          <NextLink
            href={`/admin?name=users&id=${node?.createdBy?.resourceId}`}
          >
            {node?.createdBy?.email || 'No email'}
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

  return (
    <AdminDetail
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      onSaveChanges={handleSaveChanges}
      onDelete={handleDelete}
      ignoreItems={ignoreItems}
      customItems={customItems}
      additionalHeaderButtons={<AdminNodeUpgrade />}
      detailsName="id"
      metricsKey="ip"
      hasMetrics
    />
  );
};
