import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { SettingsView, BillingSettings } from '@modules/settings';

const Component = () => <BillingSettings />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsView>{page}</SettingsView>
    </AppLayout>
  );
};

export default Component;
