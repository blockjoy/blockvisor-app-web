import { PageSection, PageTitle } from '@shared/components';
import { useMemo } from 'react';
import { Tabs, useTabs } from '@shared/index';
import { useRouter } from 'next/router';
import {
  Subscription,
  Invoices,
  PaymentPreview,
  useSubscription,
} from '@modules/billing/';

// TODO: Don't show PaymentPreview and Invoices Tab if there is no subscription
export const Billing = () => {
  const { push } = useRouter();
  const { subscription } = useSubscription();

  const tabItems = useMemo(
    () =>
      [
        {
          label: 'Plan',
          value: '1',
          component: (
            <PageSection bottomBorder={false}>
              <Subscription />
            </PageSection>
          ),
        },
        {
          label: 'Payment method',
          value: '2',
          component: (
            <PageSection bottomBorder={false}>
              <PaymentPreview />
            </PageSection>
          ),
        },
        {
          label: 'Invoice History',
          value: '3',
          component: (
            <PageSection bottomBorder={false}>
              <Invoices />
            </PageSection>
          ),
        },
      ].filter((tabItem) => tabItem.value === '1' || subscription),
    [subscription],
  );
  const { activeTab, setActiveTab } = useTabs(tabItems.length);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
    push(
      {
        pathname: '/billing',
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <PageTitle title="Billing" />
      {/* <BillingUIProvider> */}
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
      {/* </BillingUIProvider> */}
    </>
  );
};
