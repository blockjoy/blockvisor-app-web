import { AppLayout } from '@modules/layout';
import { NodeView, NodeViewJobList } from '@modules/node';

const Component = () => <NodeViewJobList />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
