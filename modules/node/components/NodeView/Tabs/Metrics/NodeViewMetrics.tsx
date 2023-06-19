import { styles } from './NodeViewMetrics.styles';
import { NetdataDashboard } from '@shared/components';
import { useNodeView } from '@modules/node/hooks/useNodeView';

export const NodeViewMetrics = () => {
  const { node } = useNodeView();

  return (
    <div css={styles.wrapper}>
      <NetdataDashboard nodeId={node!.id} />
    </div>
  );
};
