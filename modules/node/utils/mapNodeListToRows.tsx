import { TableBlock } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeJobProgress } from './getNodeJobProgress';
import { css } from '@emotion/react';
import { escapeHtml } from '@shared/utils/escapeHtml';

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
    },
    {
      name: 'Launched',
      key: '3',
      width: '200px',
      maxWidth: '200px',
    },
    {
      name: 'Status',
      key: '4',
      width: '400px',
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
                  {node.blockchainName} | {node.network}
                </p>
              }
              topRow={escapeHtml(node.displayName)}
              bottomRow={node?.ip!}
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
