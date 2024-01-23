import { AppLayout } from '@modules/layout';
import { NodeView, NodeCommandLogs } from '@modules/node';

const Component = () => <NodeCommandLogs />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
