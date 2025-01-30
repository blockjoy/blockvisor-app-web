import { AppLayout } from '@modules/layout';
import { Invoices } from '@modules/billing';
import { SettingsWrapper } from '@modules/settings';

const Component = () => <Invoices />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsWrapper hideOrgPicker={false}>{page}</SettingsWrapper>
    </AppLayout>
  );
};

export default Component;
