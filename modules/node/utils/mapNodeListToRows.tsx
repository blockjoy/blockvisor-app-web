import { TableBlockNodes } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node } from '@modules/grpc/library/node';

export const mapNodeListToRows = (nodeList?: Node[]) => {
  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '30px',
      minWidth: '30px',
      maxWidth: '30px',
    },
    {
      name: 'Name',
      key: '2',
      width: '300px',
    },
    {
      name: 'Added',
      key: '3',
      width: '200px',
    },
    {
      name: 'Status',
      key: '4',
      width: '200px',
    },
  ];

  const rows = nodeList?.map((node: any) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px' }}>
            <BlockchainIcon size="32px" blockchainName={node.blockchainName} />
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <TableBlockNodes id={node.id} name={node.name} address={node.ip} />
          </>
        ),
      },
      {
        key: '3',
        component: (
          <span style={{ fontSize: '14px' }}>
            {!node.created_at_datetime
              ? 'Oh Shit'
              : formatDistanceToNow(new Date(node.created_at_datetime), {
                  addSuffix: true,
                })}
          </span>
        ),
      },
      {
        key: '4',
        component: <NodeStatus status={node.status} />,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
