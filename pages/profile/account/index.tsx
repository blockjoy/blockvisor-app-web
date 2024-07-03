import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { ProtectedRoute } from '@modules/auth';
import { ProfileWrapper, Account } from '@modules/profile';

const Component = () => <Account />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProtectedRoute>
        <ProfileWrapper>{page}</ProfileWrapper>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default Component;
