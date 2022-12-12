import { Host } from '@modules/hosts';
import { AppLayout } from '@modules/layout';

const HostPage = () => <Host />;

HostPage.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Hosts', 'View Host']}>{page}</AppLayout>;
};

export default HostPage;
