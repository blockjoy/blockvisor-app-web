import { useTabs } from '@shared/hooks/useTabs';
import { PageSection, PageTitle, Tabs } from '@shared/components';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PaymentMethods } from '../../billing/components/PaymentMethods/PaymentMethods/PaymentMethods';
import { BillingInfo } from '@modules/billing';

export const Settings = () => {
  const { push } = useRouter();

  const tabItems = useMemo(
    () => [
      {
        label: 'Payment Methods',
        value: '1',
        component: (
          <PageSection bottomBorder={false}>
            <PaymentMethods />
          </PageSection>
        ),
      },
      {
        label: 'Billing Info',
        value: '2',
        component: (
          <PageSection bottomBorder={false}>
            <BillingInfo />
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
        pathname: '/settings',
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <>
      <PageTitle title="Settings" />
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
