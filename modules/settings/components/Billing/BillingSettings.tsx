import { useMemo } from 'react';
import { useTabs } from '@shared/hooks/useTabs';
import { PageSection, Tabs } from '@shared/components';
import { BillingInfo, PaymentMethods } from '@modules/billing';

export const BillingSettings = () => {
  const tabItems = useMemo(
    () => [
      {
        label: 'Payment Methods',
        value: 'payment-methods',
        component: (
          <PageSection
            noSectionPadding={true}
            bottomBorder={false}
            topPadding={false}
          >
            <PaymentMethods />
          </PageSection>
        ),
      },
      {
        label: 'Billing Address',
        value: 'billing-address',
        component: (
          <PageSection
            noSectionPadding={true}
            bottomBorder={false}
            topPadding={false}
          >
            <BillingInfo />
          </PageSection>
        ),
      },
    ],
    [],
  );

  const { activeTab, handleActiveTabChange } = useTabs(tabItems);

  return (
    <Tabs
      activeTab={activeTab}
      onTabClick={handleActiveTabChange}
      tabItems={tabItems}
      type="inner"
    />
  );
};
