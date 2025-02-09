import { useNodeView } from '@modules/node';
import { NetdataDashboard, NodeItems } from '@shared/components';
import { styles } from './NodeViewSidePanel.styles';

export const NodeViewSidePanel = () => {
  const { node } = useNodeView();
  return (
    <>
      <div css={styles.form}>
        <h3 css={styles.formHeader}>Block Height</h3>
        <div css={styles.blockheightWrapper}>
          <NodeItems.BlockHeight blockHeight={node?.blockHeight} view="card" />
        </div>
      </div>
      {node?.blockHeight! > -1 && (
        <NetdataDashboard
          id={node?.nodeId!}
          name={node?.nodeName!}
          is_node="true"
        />
      )}
    </>
  );
};
