import { NodeViewDashboardStatus } from './Status/NodeViewDashboardStatus';
import { NodeViewDashboardDetails } from './Details/NodeViewDashboardDetails';
import { NodeViewDashboardMetrics } from './Metrics/NodeViewDashboardMetrics';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { TableSkeleton } from '@shared/components';
import { styles } from './NodeViewDashboard.styles';

export const NodeViewDashboard = () => {
  const { isLoading, node } = useNodeView();

  return isLoading && !node?.id ? (
    <TableSkeleton />
  ) : (
    <section css={styles.wrapper}>
      <NodeViewDashboardStatus />
      {/* <NodeViewDashboardMetrics /> */}
      <NodeViewDashboardDetails />
      {/* {node?.properties && !isLoading && (
        <PageSection bottomBorder={false}>
          <NodeViewConfig />
        </PageSection>
      )} */}
    </section>
  );
};
