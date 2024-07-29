import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { ProfileWrapper, ProfileForm } from '@modules/profile';

const Component = () => <ProfileForm />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProfileWrapper>{page}</ProfileWrapper>
    </AppLayout>
  );
};

export default Component;
