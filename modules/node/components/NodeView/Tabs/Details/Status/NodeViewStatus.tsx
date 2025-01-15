import { useRecoilValue } from 'recoil';
import { NodeStatusIcon, SvgIcon } from '@shared/components';
import { useNodeView } from '@modules/node';
import { styles } from './NodeViewStatus.styles';
import { getNodeStatusColor, NodeStatusName } from '@shared/components';
import { NodeState } from '@modules/grpc/library/blockjoy/common/v1/node';
import { authSelectors } from '@modules/auth';
import IconBlockHeight from '@public/assets/icons/app/BlockHeight.svg';

const iconSize = '24px';

const protocolProgressStatuses = ['uploading', 'downloading'];

export const NodeViewStatus = () => {
  const { node } = useNodeView();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  if (!node?.nodeId) return null;

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
                  status={NodeState.NODE_STATE_STARTING}
                />
              )}
            </SvgIcon>
            <var css={[styles.cardValue]}>
              {node?.blockHeight?.toLocaleString('en-US') ?? 'Syncing'}
            </var>
            <h3 css={styles.cardLabel}>Block Height</h3>
          </div>
        )}
        {(!protocolProgressStatuses.includes(
          node.nodeStatus?.protocol?.state!,
        ) ||
          isSuperUser) && (
          <div css={styles.card}>
            <NodeStatusIcon size={iconSize} status={node!.nodeStatus?.state!} />
            <var
              css={[
                styles.cardValue,
                getNodeStatusColor(node.nodeStatus?.state!),
              ]}
            >
              <NodeStatusName status={node.nodeStatus?.state!} />
            </var>
            <h3 css={styles.cardLabel}>Node Status</h3>
          </div>
        )}
        {Boolean(node.nodeStatus?.protocol?.health) &&
          (!protocolProgressStatuses.includes(
            node.nodeStatus?.protocol?.state!,
          ) ||
            isSuperUser) && (
            <div css={styles.card}>
              <NodeStatusIcon
                size={iconSize}
                type="protocol"
                status={node.nodeStatus?.protocol?.health}
              />
              <var
                css={[
                  styles.cardValue,
                  getNodeStatusColor(
                    node.nodeStatus?.protocol?.health,
                    'protocol',
                  ),
                ]}
              >
                <NodeStatusName
                  status={node.nodeStatus?.protocol?.health}
                  type="protocol"
                />
              </var>
              <h3 css={styles.cardLabel}>Protocol Health</h3>
            </div>
          )}
        {Boolean(node.nodeStatus?.protocol?.state) && (
          <div css={styles.card}>
            <NodeStatusIcon
              size={iconSize}
              protocolStatus={node?.nodeStatus?.protocol?.state}
            />
            <var
              css={[
                styles.cardValue,
                getNodeStatusColor(
                  undefined,
                  undefined,
                  node?.nodeStatus?.protocol?.state,
                ),
              ]}
            >
              <NodeStatusName
                protocolStatus={node?.nodeStatus?.protocol?.state}
              />
            </var>
            <h3 css={styles.cardLabel}>Protocol Status</h3>
          </div>
        )}
      </div>
    </>
  );
};
