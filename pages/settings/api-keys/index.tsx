import { AppLayout } from '@modules/layout';
import { SettingsWrapper, ApiKeys } from '@modules/settings';

const Component = () => <ApiKeys />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <SettingsWrapper>{page}</SettingsWrapper>
    </AppLayout>
  );
};

export default Component;
