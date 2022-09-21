import { AppLayout } from '@modules/layout';
import { Hosts } from '@modules/hosts/components/Hosts';

const HostsPage = () => <Hosts />;

HostsPage.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Hosts', 'All']}>{page}</AppLayout>;
};

export default HostsPage;
