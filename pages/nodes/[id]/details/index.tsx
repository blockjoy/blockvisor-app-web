import { AppLayout } from '@modules/layout';
import { NodeView } from '@modules/node';
import { NodeViewDetails } from '@modules/node';

const Component = () => <NodeViewDetails />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
