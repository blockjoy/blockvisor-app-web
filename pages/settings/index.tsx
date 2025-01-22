import { AppLayout } from '@modules/layout';
import { SettingsView } from '@modules/settings';

const Settings = () => <SettingsView />;

Settings.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout pageTitle="Settings" isPageFlex>
      {page}
    </AppLayout>
  );
};

export default Settings;
