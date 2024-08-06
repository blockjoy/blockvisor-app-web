import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { BillingWrapper } from '@modules/billing';

const Billing = () => <BillingWrapper />;

Billing.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="Billing">{page}</AppLayout>;
};

export default Billing;
