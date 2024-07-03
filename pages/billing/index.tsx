import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { BillingWrapper } from '@modules/billing';
import { ProtectedRoute } from '@modules/auth';

const Billing = () => <BillingWrapper />;

Billing.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout pageTitle="Billing">
      <ProtectedRoute>{page}</ProtectedRoute>
    </AppLayout>
  );
};

export default Billing;
