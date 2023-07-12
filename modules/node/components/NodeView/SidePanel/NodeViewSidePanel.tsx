import { useNodeView } from '@modules/node';
import {
  FormHeaderCaps,
  NetdataDashboard,
  NodeStatusIcon,
} from '@shared/components';
import { styles } from './NodeViewSidePanel.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { NodeStatus } from '@modules/grpc/library/blockjoy/v1/node';

export const NodeViewSidePanel = () => {
  const { node } = useNodeView();
  return (
    <>
      <FormHeaderCaps>Metrics</FormHeaderCaps>
      <div css={styles.form}>
        <h3 css={styles.formHeader}>Block Height</h3>

        <div css={styles.blockheightWrapper}>
          {node?.blockHeight! > -1 ? (
            <var css={styles.formValue}>
              {node?.blockHeight?.toLocaleString('en-US') ?? '-'}
            </var>
          ) : (
            <div css={styles.blockheightLoader}>
              <NodeStatusIcon size="16px" status={1} />
              <p css={styles.blockheightLoaderText}>Syncing</p>
            </div>
          )}
        </div>
      </div>
      {node?.blockHeight! > -1 && (
        <NetdataDashboard nodeId={node?.id!} isSidePanel />
      )}
    </>
  );
};
