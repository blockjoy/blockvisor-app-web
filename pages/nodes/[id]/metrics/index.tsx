import { AppLayout } from '@modules/layout';
import { NodeView } from '@modules/node';
import { NodeViewMetrics } from '@modules/node';

const Component = () => <NodeViewMetrics />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
