import { AppLayout } from '@modules/layout';
import { Settings as SettingsView } from '@modules/settings/components/Settings';

const Settings = () => <SettingsView />;

Settings.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Settings">{page}</AppLayout>;
};

export default Settings;
