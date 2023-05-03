import NodeGraphs from '@public/assets/images/node-graphs.svg';
import { NodeViewFormHeader } from '../../NodeViewFormHeader';
import { styles } from './NodeViewMetrics.styles';

export const NodeViewMetrics = () => {
  return (
    <>
      <NodeViewFormHeader>Node Usage</NodeViewFormHeader>
      <section css={styles.wrapper}>
        <NodeGraphs />
      </section>
    </>
  );
};
