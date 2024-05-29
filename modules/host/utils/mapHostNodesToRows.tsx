import { TableBlock } from '@shared/components';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { getBlockchainDisplayName } from '@shared/utils/getBlockchainDisplayName';
import { getNodeJobProgress } from '@modules/node/utils/getNodeJobProgress';

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

  const rows = nodeList?.map((node: Node) => {
    const progress = getNodeJobProgress(node);
    return {
      key: node.id,
      cells: [
        {
          key: '1',
          component: (
            <div style={{ marginTop: '4px', marginLeft: '8px' }}>
              <BlockchainIcon
                size="32px"
                blockchainName={node.blockchainName}
              />
            </div>
          ),
        },
        {
          key: '2',
          component: (
            <>
              <TableBlock
                middleRow={`${getBlockchainDisplayName(
                  node.blockchainName,
                )} ${convertNodeTypeToName(node.nodeType)}`}
                topRow={node.name}
                bottomRow={node?.ip!}
              />
            </>
          ),
        },
        {
          key: '3',
          component: (
            <NodeStatus
              status={node.status}
              downloadingCurrent={progress?.current}
              downloadingTotal={progress?.total}
            />
          ),
        },
      ],
    };
  });

  return {
    rows,
    headers,
  };
};
