import { PageSection, PageTitle } from '@shared/components';
import { useMemo } from 'react';
import { Tabs, useTabs } from '@shared/index';
import { useRouter } from 'next/router';
import {
  Subscription,
  PaymentMethod,
  BillingInfo,
  Invoices,
} from '@modules/billing/';

export const Billing = () => {
  const { push } = useRouter();
  const tabItems = useMemo(
    () => [
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
            <PaymentMethod />
          </PageSection>
        ),
      },
      {
        label: 'Billing Info',
        value: '3',
        component: (
          <PageSection bottomBorder={false}>
            <BillingInfo />
          </PageSection>
        ),
      },
      {
        label: 'Invoice History',
        value: '4',
        component: (
          <PageSection bottomBorder={false}>
            <Invoices />
          </PageSection>
        ),
      },
    ],
    [],
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

      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
