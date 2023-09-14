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

export const mapNodeListToRows = (
  nodeList?: Node[],
  canDeleteNode?: boolean,
  onDeleteClick?: (id: string, name: string, hostId: string) => void,
) => {
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

  const rows = nodeList?.map((node: Node) => ({
    key: node.id,
    isClickable: node.status !== NodeStatusEnum.NODE_STATUS_PROVISIONING,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px', marginLeft: '8px' }}>
            <BlockchainIcon size="36px" blockchainName={node.blockchainName} />
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
            loadingCurrent={node?.dataSyncProgress?.current}
            loadingTotal={node?.dataSyncProgress?.total}
          />
        ),
      },
      {
        key: '5',
        component: node.status === NodeStatusEnum.NODE_STATUS_PROVISIONING && (
          <Button
            css={
              (spacing.left.large,
              css`
                width: 40px;
              `)
            }
            style="icon"
            tooltip={
              canDeleteNode
                ? 'Delete'
                : 'You have no persmission to delete this node'
            }
            onClick={() =>
              !!onDeleteClick
                ? onDeleteClick(node.id, node.name, node.hostId)
                : null
            }
            disabled={!canDeleteNode}
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
