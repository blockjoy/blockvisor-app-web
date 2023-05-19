import NodeGraphs from '@public/assets/images/node-graphs.svg';
import { FormHeaderCaps } from '@shared/components';
import { NodeViewCharts } from './NodeViewCharts';
import { styles } from './NodeViewDashboardMetrics.styles';

export const NodeViewDashboardMetrics = () => {
  return (
    <section css={styles.wrapper}>
      <FormHeaderCaps>Metrics</FormHeaderCaps>
      {/* <NodeGraphs /> */}
      <NodeViewCharts />
    </section>
  );
};
