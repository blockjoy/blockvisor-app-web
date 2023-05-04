import NodeGraphs from '@public/assets/images/node-graphs.svg';
import { NodeFormHeader } from '@modules/node';
import { styles } from './NodeViewMetrics.styles';

export const NodeViewMetrics = () => {
  return (
    <>
      <NodeFormHeader>Node Usage</NodeFormHeader>
      <section css={styles.wrapper}>
        <NodeGraphs />
      </section>
    </>
  );
};
