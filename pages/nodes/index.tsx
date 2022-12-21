import { AppLayout } from '@modules/layout';
import { NodeList } from '@modules/node';

const Nodes = () => <NodeList />;

Nodes.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};

export default Nodes;
