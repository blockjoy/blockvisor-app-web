import NodeGraphs from '@public/assets/images/node-graphs.svg';
import { NodeViewFormHeader } from '../../../NodeViewFormHeader';
import { styles } from './NodeViewDashboardMetrics.styles';

export const NodeViewDashboardMetrics = () => {
  return (
    <section css={styles.wrapper}>
      <NodeViewFormHeader>Metrics</NodeViewFormHeader>
      <NodeGraphs />
    </section>
  );
};
