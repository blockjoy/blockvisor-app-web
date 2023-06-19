import { AppLayout } from '@modules/layout';
import { NodeView } from '@modules/node';
import { NodeViewSettings } from '@modules/node';

const Component = () => <NodeViewSettings />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
