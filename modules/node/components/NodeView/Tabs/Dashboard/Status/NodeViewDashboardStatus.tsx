import { getNodeStatusInfo, NodeStatusIcon, SvgIcon } from '@shared/components';
import { useNodeView } from '@modules/node';
import { FormHeaderCaps } from '@shared/components';
import { styles } from './NodeViewDashboardStatus.styles';
import { getNodeStatusColor } from '@shared/components';
import IconBlockHeight from '@public/assets/icons/app/BlockHeight.svg';

const iconSize = '24px';

export const NodeViewDashboardStatus = () => {
  const { node } = useNodeView();

  if (!node?.id) return null;

  return (
    <>
      <FormHeaderCaps>Status</FormHeaderCaps>
      <div css={styles.wrapper}>
        <div css={styles.card}>
          <SvgIcon size={iconSize}>
            <IconBlockHeight />
          </SvgIcon>
          <var css={[styles.cardValue]}>{node.blockHeight || '-'}</var>
          <h3 css={styles.cardLabel}>Block Height</h3>
        </div>
        <div css={styles.card}>
          <NodeStatusIcon size={iconSize} status={node!.status} />
          <var css={[styles.cardValue, getNodeStatusColor(node.status!)]}>
            {getNodeStatusInfo(node.status)?.name?.toLocaleLowerCase()}
          </var>
          <h3 css={styles.cardLabel}>App Status</h3>
        </div>
        <div css={styles.card}>
          <NodeStatusIcon
            size={iconSize}
            status={node!.containerStatus}
            type="container"
          />
          <var
            css={[
              styles.cardValue,
              getNodeStatusColor(node.containerStatus!, 'container'),
            ]}
          >
            {getNodeStatusInfo(
              node.containerStatus,
              'container',
            )?.name?.toLocaleLowerCase()}
          </var>
          <h3 css={styles.cardLabel}>Node Status</h3>
        </div>
        <div css={styles.card}>
          <NodeStatusIcon
            size={iconSize}
            status={node!.syncStatus}
            type="sync"
          />
          <var
            css={[
              styles.cardValue,
              getNodeStatusColor(node.syncStatus, 'sync'),
            ]}
          >
            {getNodeStatusInfo(
              node.syncStatus,
              'sync',
            )?.name?.toLocaleLowerCase()}
          </var>
          <h3 css={styles.cardLabel}>Sync Status</h3>
        </div>
        {/* <div css={styles.card}>
          <NodeStatusIcon
            size={iconSize}
            status={node!.stakingStatus!}
            type="staking"
          />
          <var
            css={[
              styles.cardValue,
              getNodeStatusColor(node.stakingStatus!, 'staking'),
            ]}
          >
            {getNodeStatusName(node.stakingStatus!, 'staking')}
          </var>
          <h3 css={styles.cardLabel}>Staking</h3>
        </div> */}
      </div>
    </>
  );
};
