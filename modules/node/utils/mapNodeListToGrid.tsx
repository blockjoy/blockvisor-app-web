import { css } from '@emotion/react';
import { TableGridCell, NodeItems } from '@shared/components';
import { ProtocolIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { getNodeMetadataString, NodeTags } from '@modules/node';
import { checkIfNodeInProgress } from './getNodeJobProgress';

const styles = {
  blockchainNetwork: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;
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
    const inProgress = checkIfNodeInProgress(node.nodeStatus);

    return {
      key: node.nodeId,
      component: (
        <TableGridCell
          key={node.nodeId}
          onCellClick={() => onCellClick(node.nodeId)}
          titleText={escapeHtml(node.displayName! || node.nodeName)}
          {...(hasTags && { titleStyle: styles.header })}
          titleStyle={styles.header}
          titleIcon={
            <ProtocolIcon
              size="28px"
              protocolName={node.versionKey?.protocolKey}
            />
          }
          footer={
            inProgress ? (
              <NodeItems.ProtocolStatus
                nodeStatus={node.nodeStatus}
                jobs={node.jobs}
                view="badge"
              />
            ) : (
              <NodeItems.NodeStatus nodeStatus={node.nodeStatus} view="badge" />
            )
          }
          middleRow={
            <>
              <NodeTags autoHide={false} node={node} itemsPerView={3} />
              <p css={styles.blockchainNetwork}>
                {node.protocolName}
                {' | '}
                {getNodeMetadataString(node.versionMetadata, node.versionKey!)}
              </p>
            </>
          }
        />
      ),
    };
  });
};
