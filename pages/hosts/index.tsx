import { AppLayout } from '@modules/layout';
import { Hosts } from '@modules/hosts/components/HostList/HostList';

const HostsPage = () => <Hosts />;

HostsPage.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Hosts', 'All']}>{page}</AppLayout>;
};

export default HostsPage;
