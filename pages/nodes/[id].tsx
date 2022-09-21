import { AppLayout } from '@modules/layout';
import NodeModule from '@modules/node/components/nodeView/NodeView';

const Node = () => <NodeModule />;

Node.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Nodes', 'View Node']}>{page}</AppLayout>;
};

export default Node;
