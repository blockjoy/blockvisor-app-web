import { useNodeView } from '@modules/node';
import { NetdataDashboard, NodeStatusIcon } from '@shared/components';
import { styles } from './NodeViewSidePanel.styles';

export const NodeViewSidePanel = () => {
  const { node } = useNodeView();
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
              <NodeStatusIcon size="16px" status={1} isDefaultColor />
              <p css={styles.blockheightLoaderText}>Syncing</p>
            </div>
          )}
        </div>
      </div>
      {node?.blockHeight! > -1 && (
        <NetdataDashboard id={node?.id!} name={node?.name!} is_node="true" />
      )}
    </>
  );
};
