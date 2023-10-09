import { Button, TableBlock } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import {
  Node,
  NodeStatus as NodeStatusEnum,
} from '@modules/grpc/library/blockjoy/v1/node';
import { convertNodeTypeToName } from './convertNodeTypeToName';
import { SvgIcon } from '@shared/components/General';
import { spacing } from 'styles/utils.spacing.styles';
import { css } from '@emotion/react';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import { getNodeJobProgress } from './getNodeJobProgress';

export const mapNodeListToRows = (
  nodeList?: Node[],
  onDeleteClick?: (id: string, name: string, hostId: string) => void,
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
      name: 'Node',
      key: '2',
      width: '300px',
    },
    {
      name: 'Launched',
      key: '3',
      width: '200px',
    },
    {
      name: 'Status',
      key: '4',
      width: '200px',
    },
    {
      name: '',
      key: '5',
      width: '40px',
      textAlign: 'right',
    },
  ];

  const rows = nodeList?.map((node: Node) => {
    const progress = getNodeJobProgress(node);

    return {
      key: node.id,
      isClickable:
        node.status !== NodeStatusEnum.NODE_STATUS_PROVISIONING ||
        hasPermission('node-admin-get'),
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
              id={`${node.blockchainName} ${convertNodeTypeToName(
                node.nodeType,
              )}`}
              name={node.name}
              address={node?.ip!}
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
              loadingCurrent={progress?.current}
              loadingTotal={progress?.total}
            />
          ),
        },
        {
          key: '5',
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
                onClick={() =>
                  !!onDeleteClick
                    ? onDeleteClick(node.id, node.name, node.hostId)
                    : null
                }
              >
                <SvgIcon isDefaultColor>
                  <IconDelete />
                </SvgIcon>
              </Button>
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
