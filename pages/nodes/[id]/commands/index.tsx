import { AppLayout } from '@modules/layout';
import { NodeView, NodeCommands } from '@modules/node';

const Component = () => <NodeCommands />;

Component.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <NodeView>{page}</NodeView>
    </AppLayout>
  );
};

export default Component;
