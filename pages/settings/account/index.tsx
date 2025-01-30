import { AppLayout } from '@modules/layout';
import { SettingsWrapper, Account } from '@modules/settings';

const Component = () => <Account />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsWrapper>{page}</SettingsWrapper>
    </AppLayout>
  );
};

export default Component;
