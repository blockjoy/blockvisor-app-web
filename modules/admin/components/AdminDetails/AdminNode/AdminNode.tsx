import { nodeClient } from '@modules/grpc';
import { useRouter } from 'next/router';
import { AdminDetail, AdminDetailItem } from '../AdminDetail/AdminDetail';
import { NextLink, NodeStatus } from '@shared/components';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import IconNode from '@public/assets/icons/app/Node.svg';
import { capitalized } from '@modules/admin/utils/capitalized';
import { AdminDetailProperty } from '../AdminDetail/AdminDetailTable/AdminDetailTable';

const ignoreItems = [
  'id',
  'name',
  'orgId',
  'orgName',
  'hostName',
  'hostId',
  'hostOrgId',
  'placement',
  'blockchainId',
  'blockchainName',
  'blockHeight',
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
  const { id } = router.query;

  const handleOpenInApp = () => router.push(`/nodes/${id as string}`);

  const getItem = async () => await nodeClient.getNode(id as string);

  const customItems = (item: AdminDetailItem): AdminDetailProperty[] => [
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
      id: 'status',
      label: 'Status',
      data: <NodeStatus hasBorder={false} status={item.status}></NodeStatus>,
    },
    {
      id: 'appStatus',
      label: 'Container Status',
      data: (
        <NodeStatus
          hasBorder={false}
          status={item.containerStatus}
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
          status={item.syncStatus}
          type="sync"
        ></NodeStatus>
      ),
    },
    {
      id: 'blockchainName',
      label: 'Blockchain Name',
      data: item.blockchainName,
    },
    {
      id: 'blockchainId',
      label: 'Blockchain Id',
      data: item.blockchainId,
      copyValue: item.blockchainId,
    },
    {
      id: 'blockheight',
      label: 'Block Height',
      data: item.blockHeight?.toLocaleString('en-US'),
    },
    {
      id: 'nodeType',
      label: 'Node Type',
      data: capitalized(convertNodeTypeToName(item.nodeType)),
    },

    {
      id: 'orgName',
      label: 'Org Name',
      data: (
        <p>
          <NextLink href={`/admin?name=orgs&id=${item.orgId}`}>
            {item.orgName}
          </NextLink>
        </p>
      ),
    },
    {
      id: 'orgId',
      label: 'Org Id',
      data: (
        <p>
          <NextLink href={`/admin?name=orgs&id=${item.orgId}`}>
            {item.orgId}
          </NextLink>
        </p>
      ),
      copyValue: item.orgId,
    },
    {
      id: 'hostName',
      label: 'Host Name',
      data: (
        <p>
          <NextLink href={`/admin?name=hosts&id=${item.hostId}`}>
            {item.hostName}
          </NextLink>
        </p>
      ),
      copyValue: item.hostName,
    },
    {
      id: 'hostId',
      label: 'Host Id',
      data: (
        <p>
          <NextLink href={`/admin?name=hosts&id=${item.hostId}`}>
            {item.hostId}
          </NextLink>
        </p>
      ),
      copyValue: item.hostId,
    },
    {
      id: 'createdByName',
      label: 'Created By Name',
      data: (
        <p>
          <NextLink
            href={`/admin?name=users&id=${item?.createdBy?.resourceId}`}
          >
            {item?.createdBy?.name || 'No name'}
          </NextLink>
        </p>
      ),
    },
    {
      id: 'createdByEmail',
      label: 'Created By Email',
      data: (
        <p>
          <NextLink
            href={`/admin?name=users&id=${item?.createdBy?.resourceId}`}
          >
            {item?.createdBy?.email || 'No email'}
          </NextLink>
        </p>
      ),
    },
    {
      id: 'createdById',
      label: 'Created By Id',
      data: (
        <p>
          <NextLink
            href={`/admin?name=users&id=${item?.createdBy?.resourceId}`}
          >
            {item?.createdBy?.resourceId || 'No Id'}
          </NextLink>
        </p>
      ),
      copyValue: item?.createdBy?.resourceId,
    },
  ];

  return (
    <AdminDetail
      getItem={getItem}
      onOpenInApp={handleOpenInApp}
      icon={<IconNode />}
      ignoreItems={ignoreItems}
      customItems={customItems}
      detailsName="id"
    />
  );
};
