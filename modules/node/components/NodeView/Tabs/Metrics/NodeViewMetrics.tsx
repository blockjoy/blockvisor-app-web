// import NodeGraphs from '@public/assets/images/node-graphs.svg';
import { NodeViewCharts } from './NodeViewCharts';
import { styles } from './NodeViewMetrics.styles';
import { EmptyColumn } from '@shared/components';

export const NodeViewMetrics = () => {
  return (
    <>
      {/* <NodeFormHeader>Node Usage</NodeFormHeader> */}
      {/* <section css={styles.wrapper}> */}
      {/* <NodeGraphs /> */}
      <NodeViewCharts />
      {/* <EmptyColumn
          title="Coming Soon"
          description="A full page of Host metrics will appear here soon."
        /> */}
      {/* </section> */}
    </>
  );
};
