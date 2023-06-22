import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { PageSection, PageTitle } from '@shared/components';
import { ROUTES, Tabs, useTabs } from '@shared/index';
import {
  Subscription,
  Invoices,
  PaymentPreview,
  BillingContacts,
  billingSelectors,
} from '@modules/billing/';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  useHasPermissions,
  useIdentityRepository,
  Permissions,
} from '@modules/auth';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationSelectors } from '@modules/organization';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Billing = ({ item, itemPrices }: BillingProps) => {
  const { push } = useRouter();
  const subscription = useRecoilValue(billingSelectors.subscription);

  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization(user?.id),
  );

  const canReadBilling: boolean = useHasPermissions(
    userRoleInOrganization,
    Permissions.READ_BILLING,
  );

  const tabItems = useMemo(
    () =>
      [
        {
          label: 'Plan',
          value: '1',
          component: (
            <PageSection bottomBorder={false}>
              <Subscription item={item} itemPrices={itemPrices} />
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
        (tabItem) => tabItem.value === '1' || (subscription && canReadBilling),
      ),
    [subscription],
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
      <PageTitle title="Billing" />
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
