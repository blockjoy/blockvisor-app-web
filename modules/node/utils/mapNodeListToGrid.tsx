import { css } from '@emotion/react';
import { TableGridCell, NodeStatus } from '@shared/components';
import { BlockchainIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeJobProgress } from './getNodeJobProgress';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { convertNodeTypeToName, NodeTags } from '@modules/node';

const styles = {
  blockchainNetwork: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={() => onCellClick(node.id)}
          titleText={escapeHtml(node.displayName)}
          {...(hasTags && { titleStyle: styles.header })}
          titleStyle={styles.header}
          titleIcon={
            <BlockchainIcon size="28px" blockchainName={node.blockchainName} />
          }
          footer={
            <NodeStatus
              hasBorder
              status={node.status}
              downloadingCurrent={progress?.current}
              downloadingTotal={progress?.total}
            />
          }
          middleRow={
            <>
              <NodeTags autoHide={false} node={node} itemsPerView={3} />
              <p css={styles.blockchainNetwork}>
                {node.blockchainName} | {convertNodeTypeToName(node.nodeType)} |{' '}
                {node.network}
              </p>
            </>
          }
        />
      ),
    };
  });
};
