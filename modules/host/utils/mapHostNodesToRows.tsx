import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { NodeItems, TableBlock, ProtocolIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { authSelectors } from '@modules/auth';

const middleRowStyles = css`
  text-transform: capitalize;
`;

export const mapHostNodesToRows = (nodeList: Node[]) => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

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
    return {
      key: node.nodeId,
      cells: [
        {
          key: '1',
          component: (
            <div style={{ marginTop: '4px', marginLeft: '8px' }}>
              <ProtocolIcon size="32px" protocolName={node.protocolName} />
            </div>
          ),
        },
        {
          key: '2',
          component: (
            <div style={{ maxWidth: '400px' }}>
              <TableBlock
                middleRow={
                  <p css={middleRowStyles}>
                    {node.versionKey?.protocolKey}
                    {' | '}
                    {node.versionKey?.variantKey}
                  </p>
                }
                topRow={escapeHtml(node.displayName!)}
                bottomRow={isSuperUser ? node.orgName : node.ipAddress}
              />
            </div>
          ),
        },
        {
          key: '3',
          component: (
            <NodeItems.NodeStatus nodeStatus={node.nodeStatus} view="badge" />
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
