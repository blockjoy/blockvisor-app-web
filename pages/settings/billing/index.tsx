import { AppLayout } from '@modules/layout';
import { SettingsView, BillingSettings } from '@modules/settings';
import { ProtectedRoute } from '@modules/auth';

const Component = () => <BillingSettings />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProtectedRoute>
        <SettingsView>{page}</SettingsView>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default Component;
