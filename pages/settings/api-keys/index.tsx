import { ProtectedRoute } from '@modules/auth';
import { AppLayout } from '@modules/layout';
import { SettingsWrapper, ApiKeys } from '@modules/settings';

const Component = () => <ApiKeys />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProtectedRoute>
        <SettingsWrapper>{page}</SettingsWrapper>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default Component;
