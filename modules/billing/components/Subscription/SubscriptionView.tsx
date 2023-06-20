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
import { organizationSelectors } from '@modules/organization/store/organizationSelectors';
import { Breadcrumb } from '@shared/components/App/Page/Breadcrumb';

type SubscriptionViewProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const SubscriptionView = ({
  item,
  itemPrices,
}: SubscriptionViewProps) => {
  const router = useRouter();
  const subscription = useRecoilValue(billingSelectors.subscriptions[item.id]);

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
    [subscription, userRoleInOrganization],
  );
  const { activeTab, setActiveTab } = useTabs(tabItems.length);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
    router.push(
      {
        pathname: `${ROUTES.BILLING}/${router.query.id}`,
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleBack = () => {
    router.push(
      {
        pathname: ROUTES.BILLING,
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <PageTitle>
        <Breadcrumb title="Billing" handleClick={handleBack}>
          {item.external_name}
        </Breadcrumb>
      </PageTitle>
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
