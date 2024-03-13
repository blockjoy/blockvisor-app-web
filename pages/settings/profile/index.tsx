import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { Profile, SettingsView } from '@modules/settings';

const Component = () => <Profile />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsView>{page}</SettingsView>
    </AppLayout>
  );
};

export default Component;
