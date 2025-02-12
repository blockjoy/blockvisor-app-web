import { useRecoilValue } from 'recoil';
import { NodeItems } from '@shared/components';
import { NODE_PROGRESS_STATUSES, useNodeView } from '@modules/node';
import { styles } from './NodeViewStatus.styles';
import { authSelectors } from '@modules/auth';

export const NodeViewStatus = () => {
  const { node } = useNodeView();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  if (!node?.nodeId) return null;

  return (
    <>
      <div css={styles.wrapper}>
        {(isSuperUser || node.blockHeight! > -1) && (
          <div css={styles.card}>
            <NodeItems.BlockHeight blockHeight={node.blockHeight} view="card" />
            <h3 css={styles.cardLabel}>Block Height</h3>
          </div>
        )}
        {(!NODE_PROGRESS_STATUSES.includes(node.nodeStatus?.protocol?.state!) ||
          isSuperUser) && (
          <div css={styles.card}>
            <NodeItems.NodeStatus nodeStatus={node.nodeStatus} view="card" />
            <h3 css={styles.cardLabel}>Node Status</h3>
          </div>
        )}
        {Boolean(node.nodeStatus?.protocol?.health) &&
          (!NODE_PROGRESS_STATUSES.includes(
            node.nodeStatus?.protocol?.state!,
          ) ||
            isSuperUser) && (
            <div css={styles.card}>
              <NodeItems.ProtocolHealth
                nodeStatus={node.nodeStatus}
                view="card"
              />
              <h3 css={styles.cardLabel}>Protocol Health</h3>
            </div>
          )}
        {Boolean(node.nodeStatus?.protocol?.state) &&
          node.nodeStatus?.protocol?.state !== 'uploading' &&
          node.nodeStatus?.protocol?.state !== 'downloading' && (
            <div css={styles.card}>
              <NodeItems.ProtocolStatus
                nodeStatus={node.nodeStatus}
                view="card"
              />
              <h3 css={styles.cardLabel}>Protocol Status</h3>
            </div>
          )}
      </div>
    </>
  );
};
