import { css } from '@emotion/react';
import { formatDistanceToNow } from 'date-fns';
import { Node, NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { TableBlock, BlockchainIcon, NodeStatus } from '@shared/components';
import { getNodeJobProgress } from './getNodeJobProgress';
import { NodeName, convertNodeTypeToName } from '@modules/node';

const middleRowStyles = css`
  text-transform: capitalize;
`;

export const mapNodeListToRows = (nodeList?: Node[]) => {
  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '40px',
      minWidth: '60px',
      maxWidth: '100px',
    },
    {
      name: 'Node',
      key: '2',
      width: '300px',
      maxWidth: '300px',
      dataField: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    },
    {
      name: 'Launched',
      key: '3',
      width: '200px',
      maxWidth: '200px',
      dataField: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    },
    {
      name: 'Status',
      key: '4',
      width: '400px',
      dataField: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
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
                size="36px"
                blockchainName={node.blockchainName}
              />
            </div>
          ),
        },
        {
          key: '2',
          component: (
            <TableBlock
              middleRow={
                <p css={middleRowStyles}>
                  {node.blockchainName} | {convertNodeTypeToName(node.nodeType)}{' '}
                  | {node.network}
                </p>
              }
              topRow={<NodeName node={node} />}
              bottomRow={node?.ip!}
              isOverflow={false}
            />
          ),
        },
        {
          key: '3',
          component: (
            <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
              {formatDistanceToNow(new Date(node.createdAt!), {
                addSuffix: true,
              })}
            </span>
          ),
        },
        {
          key: '4',
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
