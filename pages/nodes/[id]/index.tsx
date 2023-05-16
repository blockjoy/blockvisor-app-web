import { AppLayout } from '@modules/layout';
import { NodeView, NodeViewDashboard } from '@modules/node/';

const Node = () => <NodeView />;

Node.getLayout = function getLayout() {
  return (
    <AppLayout isPageFlex>
      <NodeView>
        <NodeViewDashboard />
      </NodeView>
    </AppLayout>
  );
};

export default Node;
