import { useMemo } from 'react';
import { useTabs } from '@shared/index';
import { Tabs } from '@shared/components';
import { BillingInfo, PaymentMethods } from '@modules/billing';

export const BillingSettings = () => {
  const tabItems = useMemo(
    () => [
      {
        label: 'Payment Methods',
        value: 'payment-methods',
        component: <PaymentMethods />,
      },
      {
        label: 'Billing Address',
        value: 'billing-address',
        component: <BillingInfo />,
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
