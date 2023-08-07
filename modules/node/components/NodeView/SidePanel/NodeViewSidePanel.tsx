import { useNodeView } from '@modules/node';
import { NetdataDashboard, NodeStatusIcon } from '@shared/components';
import { styles } from './NodeViewSidePanel.styles';

export const NodeViewSidePanel = () => {
  const { node } = useNodeView();

  //TODO: add real data
  return (
    <>
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
              <p css={styles.blockheightLoaderText}>Syancing</p>
            </div>
          )}
        </div>
      </div>
      <h3 css={styles.formHeader}>RPC Requests</h3>
      <span css={styles.formValue}>112.3k p/s</span>
      {node?.blockHeight! > -1 && (
        <NetdataDashboard nodeId={node?.id!} isSidePanel />
      )}
    </>
  );
};
