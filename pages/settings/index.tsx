import { AppLayout } from '@modules/layout';
import { Settings as SettingsView } from '@modules/settings/components/Settings';
import { ReactNode } from 'react';

const Settings = () => <SettingsView />;

Settings.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="Settings">{page}</AppLayout>;
};

export default Settings;
