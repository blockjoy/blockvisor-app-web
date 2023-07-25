import { TableBlock } from '@shared/components';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node, NodeType } from '@modules/grpc/library/blockjoy/v1/node';

export const mapHostNodesToRows = (nodeList: Node[]) => {
  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '40px',
      minWidth: '60px',
      maxWidth: '100px',
    },
    {
      name: 'Name',
      key: '2',
    },
    {
      name: 'Status',
      key: '3',
    },
  ];

  const rows = nodeList?.map((node: Node) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px', marginLeft: '8px' }}>
            <BlockchainIcon size="32px" blockchainName={node.blockchainName} />
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <TableBlock
              id={`${node.blockchainName} ${NodeType[node.nodeType]
                .replace('NODE_TYPE_', '')
                .toLowerCase()}`}
              name={node.name}
              address={node?.ip!}
            />
          </>
        ),
      },
      {
        key: '3',
        component: <NodeStatus status={node.status} />,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
