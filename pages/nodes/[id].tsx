import { AppLayout } from '@modules/layout';
import { NodeView } from '@modules/node/';

const Node = () => <NodeView />;

Node.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Node">{page}</AppLayout>;
};

export default Node;
