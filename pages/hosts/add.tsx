import { HostAdd } from '@modules/hosts';
import { AppLayout } from '@modules/layout';

const HostInstallPage = () => <HostAdd />;

HostInstallPage.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Hosts', 'Add Host']}>{page}</AppLayout>;
};

export default HostInstallPage;
