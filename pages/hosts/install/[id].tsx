import { HostInstall } from '@modules/hosts';
import { AppLayout } from '@modules/layout';

const HostInstallPage = () => <HostInstall />;

HostInstallPage.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Host', 'Install']}>{page}</AppLayout>;
};

export default HostInstallPage;
