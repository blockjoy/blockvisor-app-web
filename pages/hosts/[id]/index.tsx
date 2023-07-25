import { AppLayout } from '@modules/layout';
import {
  HostView,
  HostViewTitle,
  HostViewDetails,
  HostWrapper,
} from '@modules/host';

const Host = () => <HostViewDetails />;

Host.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex>
      <HostWrapper title={<HostViewTitle />}>
        <HostView>{page}</HostView>
      </HostWrapper>
    </AppLayout>
  );
};

export default Host;
