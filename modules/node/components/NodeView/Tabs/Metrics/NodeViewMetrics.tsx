import { NodeViewCharts } from './NodeViewCharts';
import { styles } from './NodeViewMetrics.styles';
import { EmptyColumn } from '@shared/components';

export const NodeViewMetrics = () => {
  return (
    <div css={styles.wrapper}>
      {process.env.NODE_ENV === 'development' ? (
        <NodeViewCharts />
      ) : (
        <EmptyColumn
          title="Coming Soon"
          description="A full page of Host metrics will appear here soon."
        />
      )}
    </div>
  );
};
