import { css } from '@emotion/react';
import { TableGridCell, NodeStatus } from '@shared/components';
import { ProtocolIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeJobProgress } from './getNodeJobProgress';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { NodeTags } from '@modules/node';

const styles = {
  blockchainNetwork: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    margin: 2px 0 10px;
    line-height: 1.6;
  `,
  tags: (hasTags?: boolean) => css`
    padding: 2px 0 4px;
    min-width: ${hasTags ? '200px' : '30px'};
    width: ${hasTags ? '100%' : 'auto'};
  `,
  header: css`
    max-width: calc(100% - 38px);
    h2 {
      padding-right: 0;
    }
  `,
};

export const mapNodeListToGrid = (
  nodeList: Node[],
  onCellClick: (args0: any) => void,
) => {
  return nodeList?.map((node: Node) => {
    const hasTags = Boolean(node.tags?.tags.length);
    const progress = getNodeJobProgress(node);

    return {
      key: node.nodeId,
      component: (
        <TableGridCell
          key={node.nodeId}
          onCellClick={() => onCellClick(node.nodeId)}
          titleText={escapeHtml(node.displayName!)}
          {...(hasTags && { titleStyle: styles.header })}
          titleStyle={styles.header}
          titleIcon={
            <ProtocolIcon size="28px" protocolName={node.protocolName} />
          }
          footer={
            <NodeStatus
              hasBorder
              status={node.nodeStatus?.state!}
              downloadingCurrent={progress?.current}
              downloadingTotal={progress?.total}
            />
          }
          middleRow={
            <>
              <NodeTags autoHide={false} node={node} itemsPerView={3} />
              <p css={styles.blockchainNetwork}>
                {node.protocolName} | {node.versionKey?.variantKey}
              </p>
            </>
          }
        />
      ),
    };
  });
};
