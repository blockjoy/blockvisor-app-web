import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { PageSection, PageTitle, Tabs } from '@shared/components';
import { ROUTES, useTabs } from '@shared/index';
import {
  Invoices,
  PaymentPreview,
  BillingContacts,
  billingSelectors,
  billingAtoms,
  BillingView,
} from '@modules/billing';
import { useHasPermissions, Permissions } from '@modules/auth';
import { organizationSelectors } from '@modules/organization';
import IconBilling from '@public/assets/icons/common/Billing.svg';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Billing = ({ item, itemPrices }: BillingProps) => {
  const { push } = useRouter();
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canUpdateBilling: boolean = useHasPermissions(
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

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
          label: 'Payment method',
          value: '2',
          component: (
            <PageSection bottomBorder={false}>
              <PaymentPreview />
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
