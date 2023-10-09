import { AppLayout } from '@modules/layout';
import { NodeView, NodeViewJobView } from '@modules/node';

const Component = () => <NodeViewJobView />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
