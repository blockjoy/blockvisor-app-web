import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { SettingsView } from '@modules/settings';

const Settings = () => <SettingsView />;

Settings.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="Settings">{page}</AppLayout>;
};

export default Settings;
