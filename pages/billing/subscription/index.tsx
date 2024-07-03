import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { ProtectedRoute } from '@modules/auth';
import { BillingWrapper, SubscriptionView } from '@modules/billing';

const Component = () => <SubscriptionView />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProtectedRoute>
        <BillingWrapper>{page}</BillingWrapper>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default Component;
