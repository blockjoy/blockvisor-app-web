import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { PageSection, Tabs } from '@shared/components';
import { useTabs } from '@shared/index';
import {
  Invoices,
  billingAtoms,
  // Subscription,
  // Estimates,
  SubscriptionInfo,
} from '@modules/billing';

export const SubscriptionViewTabs = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const tabItems = useMemo(
    () => [
      {
        label: 'Details',
        value: 'details',
        component: <SubscriptionInfo />,
      },
      // {
      //   label: 'Estimates',
      //   value: 'estimates',
      //   component: <Estimates />,
      // },
      {
        label: 'Invoices',
        value: 'invoices',
        component: <Invoices />,
      },
    ],
    [subscription],
  );

  const { activeTab, handleActiveTabChange } = useTabs(tabItems);

  return (
    <Tabs
      activeTab={activeTab}
      onTabClick={handleActiveTabChange}
      tabItems={tabItems}
      isLoading={subscriptionLoadingState === 'initializing'}
      type="inner"
    />
  );
};
