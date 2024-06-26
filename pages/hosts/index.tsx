import { AppLayout } from '@modules/layout';
import { HostList, HostListTitle, HostWrapper } from '@modules/host';

const Hosts = () => (
  <HostWrapper title={<HostListTitle />}>
    <HostList />
  </HostWrapper>
);

Hosts.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex pageTitle="Hosts">
      {page}
    </AppLayout>
  );
};

export default Hosts;
