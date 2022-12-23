import { AppLayout } from '@modules/layout';
import { NodeList } from '@modules/node';
import { NodeUIProvider } from '@modules/node/ui/NodeUIContext';

const Nodes = () => (
  <NodeUIProvider>
    <NodeList />
  </NodeUIProvider>
);

Nodes.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Nodes', 'All']}>{page}</AppLayout>;
};

export default Nodes;
