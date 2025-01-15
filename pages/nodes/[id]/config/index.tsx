import { AppLayout } from '@modules/layout';
import { NodeView, NodeViewConfig } from '@modules/node';

const Component = () => <NodeViewConfig />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
