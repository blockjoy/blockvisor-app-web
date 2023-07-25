import { AppLayout } from '@modules/layout';
import { HostList, HostListTitle, HostWrapper } from '@modules/host';
import { HostUIProvider } from '@modules/host';

const Hosts = () => (
  <HostUIProvider>
    <HostWrapper title={<HostListTitle />}>
      <HostList />
    </HostWrapper>
  </HostUIProvider>
);

Hosts.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex pageTitle="Hosts">
      {page}
    </AppLayout>
  );
};

export default Hosts;
