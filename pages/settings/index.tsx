import { AppLayout } from '@modules/layout';
import { SettingsWrapper } from '@modules/settings';

const Component = () => <SettingsWrapper />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout pageTitle="Settings" isPageFlex>
      {page}
    </AppLayout>
  );
};

export default Component;
