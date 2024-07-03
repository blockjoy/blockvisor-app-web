import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { ProtectedRoute } from '@modules/auth';
import { ProfileWrapper, ProfileForm } from '@modules/profile';

const Component = () => <ProfileForm />;

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
