import { Button, SvgIcon, TableBlock } from '@shared/components';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeStatus as NodeStatusEnum } from '@modules/grpc/library/blockjoy/common/v1/node';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import { spacing } from 'styles/utils.spacing.styles';
import { css } from '@emotion/react';
import IconDelete from '@public/assets/icons/common/Trash.svg';

export const mapHostNodesToRows = (
  nodeList: Node[],
  onDeleteClick?: (node: Node) => void,
) => {
  const { hasPermission } = usePermissions();

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
    {
      name: '',
      key: '4',
    },
  ];

  const rows = nodeList?.map((node: Node) => ({
    key: node.id,
    isClickable:
      node.status !== NodeStatusEnum.NODE_STATUS_PROVISIONING ||
      hasPermission('node-admin-get'),
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
              id={`${node.blockchainName} ${convertNodeTypeToName(
                node.nodeType,
              )}`}
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
      {
        key: '4',
        component: node.status === NodeStatusEnum.NODE_STATUS_PROVISIONING &&
          !hasPermission('node-admin-get') && (
            <Button
              css={
                (spacing.left.large,
                css`
                  width: 40px;
                `)
              }
              style="icon"
              tooltip="Delete"
              onClick={() => (!!onDeleteClick ? onDeleteClick(node) : null)}
            >
              <SvgIcon isDefaultColor>
                <IconDelete />
              </SvgIcon>
            </Button>
          ),
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
