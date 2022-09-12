import { AppLayout } from '@modules/layout';
import Module from '@modules/app/components/organizations/Organizations';

const Nodes = () => <Module />;

Nodes.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Organizations', 'All']}>{page}</AppLayout>;
};

export default Nodes;
