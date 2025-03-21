import { AppLayout } from '@modules/layout';
import { SettingsWrapper, Profile } from '@modules/settings';

const Component = () => <Profile />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsWrapper>{page}</SettingsWrapper>
    </AppLayout>
  );
};

export default Component;
