import { AppLayout } from '@modules/layout';
import { NodeView, NodeViewDetails } from '@modules/node/';

const Node = () => <NodeView />;

Node.getLayout = function getLayout() {
  return (
    <AppLayout isPageFlex>
      <NodeView>
        <NodeViewDetails />
      </NodeView>
    </AppLayout>
  );
};

export default Node;
