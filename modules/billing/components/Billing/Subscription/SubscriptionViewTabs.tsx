import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { PageSection, Tabs } from '@shared/components';
import { useTabs } from '@shared/index';
import {
  Invoices,
  billingAtoms,
  Subscription,
  Estimates,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

export const SubscriptionViewTabs = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const canUpdateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-update'),
  );

  const tabItems = useMemo(
    () =>
      [
        {
          label: 'Details',
          value: 'details',
          component: <Subscription />,
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
      ].filter(
        (tabItem) =>
          tabItem.value === 'subscription' ||
          (subscription && canUpdateSubscription),
      ),
    [subscription, canUpdateSubscription],
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
