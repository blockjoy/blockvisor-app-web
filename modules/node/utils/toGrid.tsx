import { css } from '@emotion/react';
import { TableGridCell, NodeStatus } from '@shared/components';
import { BlockchainIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeJobProgress } from './getNodeJobProgress';

const styles = {
  blockchainNetwork: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

export const toGrid = (nodeList: Node[], onCellClick: (args0: any) => void) => {
  return nodeList?.map((node: Node) => {
    const progress = getNodeJobProgress(node);
    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={() => onCellClick(node.id)}
          titleText={node.name}
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
            <p css={styles.blockchainNetwork}>
              {node.blockchainName} | {node.network}
            </p>
          }
        />
      ),
    };
  });
};
