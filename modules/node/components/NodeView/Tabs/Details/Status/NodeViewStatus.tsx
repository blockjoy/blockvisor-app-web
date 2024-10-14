import { useRecoilValue } from 'recoil';
import { getNodeStatusInfo, NodeStatusIcon, SvgIcon } from '@shared/components';
import { useNodeView } from '@modules/node';
import { styles } from './NodeViewStatus.styles';
import { getNodeStatusColor, NodeStatusName } from '@shared/components';
import IconBlockHeight from '@public/assets/icons/app/BlockHeight.svg';
import {
  ContainerStatus,
  NodeStatus,
  SyncStatus,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { authSelectors } from '@modules/auth';

const iconSize = '24px';

export const NodeViewStatus = () => {
  const { node } = useNodeView();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  if (!node?.id) return null;

  return (
    <>
      <div css={styles.wrapper}>
        {(isSuperUser || node.blockHeight! > -1) && (
          <div css={styles.card}>
            <SvgIcon isDefaultColor size={iconSize}>
              {node?.blockHeight! > -1 ? (
                <IconBlockHeight />
              ) : (
                <NodeStatusIcon
                  isDefaultColor
                  size={iconSize}
                  status={NodeStatus.NODE_STATUS_PROVISIONING}
                />
              )}
            </SvgIcon>
            <var css={[styles.cardValue]}>
              {node?.blockHeight?.toLocaleString('en-US') ?? 'Syncing'}
            </var>
            <h3 css={styles.cardLabel}>Block Height</h3>
          </div>
        )}
        <div css={styles.card}>
          <NodeStatusIcon size={iconSize} status={node!.status} />
          <var css={[styles.cardValue, getNodeStatusColor(node.status!)]}>
            <NodeStatusName status={node.status} />
          </var>
          <h3 css={styles.cardLabel}>Node Status</h3>
        </div>
        {node.containerStatus !==
          ContainerStatus.CONTAINER_STATUS_UNSPECIFIED && (
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
            <h3 css={styles.cardLabel}>Container Status</h3>
          </div>
        )}
        {node.syncStatus !== SyncStatus.SYNC_STATUS_UNSPECIFIED && (
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
        )}
      </div>
    </>
  );
};
