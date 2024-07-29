import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { BillingWrapper, SubscriptionView } from '@modules/billing';

const Component = () => <SubscriptionView />;

Component.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout isPageFlex>
      <BillingWrapper>{page}</BillingWrapper>
    </AppLayout>
  );
};

export default Component;
