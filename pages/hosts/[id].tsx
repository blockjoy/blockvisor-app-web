import { AppLayout } from '@modules/layout';
import HostModule from '@modules/app/components/host/Host';

const Host = () => <HostModule />;

Host.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Hosts', 'View Host']}>{page}</AppLayout>;
};

export default Host;
