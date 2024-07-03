import { AppLayout } from '@modules/layout';
import { ProtectedRoute } from '@modules/auth';
import { BillingWrapper, PaymentDetails } from '@modules/billing';

const Component = () => <PaymentDetails />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <ProtectedRoute>
        <BillingWrapper>{page}</BillingWrapper>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default Component;
