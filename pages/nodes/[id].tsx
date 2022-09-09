import { AppLayout } from '@modules/layout';
import NodeModule from '@modules/app/components/node/Node';

const Node = () => <NodeModule />;

Node.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Nodes', 'View Node']}>{page}</AppLayout>;
};

export default Node;
