import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { ProfileWrapper, Account } from '@modules/profile';

const Component = () => <Account />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProfileWrapper>{page}</ProfileWrapper>
    </AppLayout>
  );
};

export default Component;
