import { AppLayout } from '@modules/layout';
import { HostList } from '@modules/host';
import { HostUIProvider } from '@modules/host';

const Hosts = () => (
  <HostUIProvider>
    <HostList />
  </HostUIProvider>
);

Hosts.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Hosts">{page}</AppLayout>;
};

export default Hosts;
