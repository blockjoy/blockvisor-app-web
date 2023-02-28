import { AppLayout } from '@modules/layout';
import { Billing as BillingView } from '@modules/billing';

const Billing = () => <BillingView />;

Billing.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Billing">{page}</AppLayout>;
};

export default Billing;
