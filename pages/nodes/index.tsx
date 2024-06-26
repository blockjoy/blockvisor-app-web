import { AppLayout } from '@modules/layout';
import { NodeList } from '@modules/node';

const Nodes = () => <NodeList />;

Nodes.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Nodes">{page}</AppLayout>;
};

export default Nodes;
