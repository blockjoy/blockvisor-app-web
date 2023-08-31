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
  BillingView,
  Estimates,
  useEstimates,
  useBillingContacts,
  useInvoices,
} from '@modules/billing';
import { useHasPermissions, Permissions, authSelectors } from '@modules/auth';
import { organizationSelectors } from '@modules/organization';
import IconBilling from '@public/assets/icons/common/Billing.svg';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Billing = ({ item, itemPrices }: BillingProps) => {
  const { push } = useRouter();
  const subscription = useRecoilValue(billingSelectors.subscription);
  const userSubscription = useRecoilValue(billingSelectors.userSubscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canUpdateBilling: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

  const { getEstimate } = useEstimates();
  const { getBillingContacts } = useBillingContacts();
  const { getInvoices } = useInvoices();

  const tabItems = useMemo(
    () =>
      [
        {
          label: subscription ? 'Subscription' : 'Plan',
          value: '1',
          component: (
            <PageSection bottomBorder={false}>
              <BillingView item={item} itemPrices={itemPrices} />
            </PageSection>
          ),
        },
        {
          label: 'Estimates',
          value: '2',
          component: (
            <PageSection bottomBorder={false}>
              <Estimates />
            </PageSection>
          ),
        },
        {
          label: 'Billing Contacts',
          value: '3',
          component: (
            <PageSection bottomBorder={false}>
              <BillingContacts />
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
      ].filter(
        (tabItem) =>
          tabItem.value === '1' || (subscription && canUpdateBilling),
      ),
    [subscription, canUpdateBilling],
  );

  const { activeTab, setActiveTab } = useTabs(tabItems.length);

  useEffect(() => {
    if (
      subscription?.status === 'active' &&
      subscriptionLoadingState === 'finished'
    ) {
      getEstimate();
      getBillingContacts();
      getInvoices();
    }
  }, [subscription]);

  useEffect(() => {
    if (!userSubscription) handleClick('1');
  }, [userSubscription]);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
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
        isLoading={subscriptionLoadingState !== 'finished'}
      />
    </>
  );
};
