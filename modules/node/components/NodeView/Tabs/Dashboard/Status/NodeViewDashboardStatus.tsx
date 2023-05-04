import { NodeStatusIcon } from '@shared/components';
import { useNodeView, NodeFormHeader } from '@modules/node';
import { styles } from './NodeViewDashboardStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';
import { getColor } from '@shared/components';

const iconSize = '24px';

export const NodeViewDashboardStatus = () => {
  const { node } = useNodeView();

  if (!node?.id) return null;

  const statusInfo = nodeStatusList.find((s) => s.id === node.status),
    containerStatusInfo = nodeStatusList.find(
      (s) => s.id === node.containerStatus,
    ),
    syncStatusInfo = nodeStatusList.find((s) => s.id === node.syncStatus),
    stakingStatusInfo = nodeStatusList.find((s) => s.id === node.stakingStatus);

  return (
    <>
      <NodeFormHeader>Status</NodeFormHeader>
      <div css={styles.wrapper}>
        <div css={styles.card}>
          <NodeStatusIcon size={iconSize} status={node!.status} />
          <var
            css={[
              styles.cardValue,
              getColor(statusInfo!.name, statusInfo!.isOnline),
            ]}
          >
            {statusInfo?.name}
          </var>
          <h3 css={styles.cardLabel}>Consensus</h3>
        </div>
        <div css={styles.card}>
          <NodeStatusIcon size={iconSize} status={node!.containerStatus} />
          <var
            css={[
              styles.cardValue,
              getColor(containerStatusInfo!.name, statusInfo!.isOnline),
            ]}
          >
            {containerStatusInfo?.name}
          </var>
          <h3 css={styles.cardLabel}>App Status</h3>
        </div>
        <div css={styles.card}>
          <NodeStatusIcon size={iconSize} status={node!.syncStatus} />
          <var
            css={[
              styles.cardValue,
              getColor(syncStatusInfo!.name, syncStatusInfo!.isOnline),
            ]}
          >
            {syncStatusInfo?.name}
          </var>
          <h3 css={styles.cardLabel}>Sync Status</h3>
        </div>
        <div css={styles.card}>
          <NodeStatusIcon size={iconSize} status={node!.stakingStatus!} />
          <var
            css={[
              styles.cardValue,
              getColor(stakingStatusInfo!.name, stakingStatusInfo!.isOnline),
            ]}
          >
            {stakingStatusInfo?.name}
          </var>
          <h3 css={styles.cardLabel}>Staking Status</h3>
        </div>
      </div>
    </>
  );
};
