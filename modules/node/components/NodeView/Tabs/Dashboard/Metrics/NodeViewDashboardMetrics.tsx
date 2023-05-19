import NodeGraphs from '@public/assets/images/node-graphs.svg';
import { NodeFormHeader } from '@modules/node';
import { NodeViewCharts } from './NodeViewCharts';
import { styles } from './NodeViewDashboardMetrics.styles';

export const NodeViewDashboardMetrics = () => {
  return (
    <section css={styles.wrapper}>
      <NodeFormHeader>Metrics</NodeFormHeader>
      {/* <NodeGraphs /> */}
      <NodeViewCharts />
    </section>
  );
};
