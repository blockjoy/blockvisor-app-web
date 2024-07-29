import { AppLayout } from '@modules/layout';
import { BillingWrapper, PaymentDetails } from '@modules/billing';

const Component = () => <PaymentDetails />;

Component.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout isPageFlex>
      <BillingWrapper>{page}</BillingWrapper>
    </AppLayout>
  );
};

export default Component;
