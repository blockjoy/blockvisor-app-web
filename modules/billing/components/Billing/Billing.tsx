import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { PageSection, PageTitle, Tabs } from '@shared/components';
import { ROUTES, useTabs } from '@shared/index';
import {
  Invoices,
  BillingContacts,
  billingSelectors,
  billingAtoms,
  SubscriptionView,
  Estimates,
  useEstimates,
  useBillingContacts,
  useInvoices,
  usePaymentMethod,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';
import IconBilling from '@public/assets/icons/common/Billing.svg';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Billing = ({ item, itemPrices }: BillingProps) => {
  const { push, query } = useRouter();
  const subscription = useRecoilValue(billingSelectors.subscription);
  const userSubscription = useRecoilValue(billingSelectors.userSubscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const { hasPermission } = usePermissions();
  const canUpdateSubscription = hasPermission('subscription-update');
  const { loadEstimates } = useEstimates();
  const { getBillingContacts } = useBillingContacts();
  const { loadInvoices } = useInvoices();
  const { getPaymentMethod } = usePaymentMethod();

  const tabItems = useMemo(
    () =>
      [
        {
          label: subscription ? 'Subscription' : 'Plan',
          value: 'subscription',
          component: (
            <PageSection bottomBorder={false}>
              <SubscriptionView item={item} itemPrices={itemPrices} />
            </PageSection>
          ),
        },
        {
          label: 'Estimates',
          value: 'estimates',
          component: (
            <PageSection bottomBorder={false}>
              <Estimates />
            </PageSection>
          ),
        },
        {
          label: 'Billing Contacts',
          value: 'billing-contacts',
          component: (
            <PageSection bottomBorder={false}>
              <BillingContacts />
            </PageSection>
          ),
        },
        {
          label: 'Invoice History',
          value: 'invoice-history',
          component: (
            <PageSection bottomBorder={false}>
              <Invoices />
            </PageSection>
          ),
        },
      ].filter(
        (tabItem) =>
          tabItem.value === 'subscription' ||
          (subscription && canUpdateSubscription),
      ),
    [subscription, canUpdateSubscription],
  );

  const { activeTab, handleActiveTabChange } = useTabs(tabItems);

  useEffect(() => {
    if (!userSubscription) handleClick('subscription');
  }, [userSubscription]);

  useEffect(() => {
    if (!canUpdateSubscription && query.tab !== 'subscription')
      handleClick('subscription');
  }, [canUpdateSubscription]);

  useEffect(() => {
    if (
      subscription?.status === 'active' &&
      subscriptionLoadingState === 'finished' &&
      canUpdateSubscription
    ) {
      loadEstimates();
      getBillingContacts();
      loadInvoices();
      getPaymentMethod();
    }
  }, [subscription]);

  const handleClick = (tabValue: string) => {
    handleActiveTabChange(tabValue);
    push(
      {
        pathname: ROUTES.BILLING,
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <PageTitle title="Billing" icon={<IconBilling />} />
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
        isLoading={subscriptionLoadingState === 'initializing'}
      />
    </>
  );
};
