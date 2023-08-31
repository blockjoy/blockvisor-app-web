import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTabs } from '@shared/hooks/useTabs';
import { PageSection, PageTitle, Tabs } from '@shared/components';
import { BillingInfo, PaymentMethods } from '@modules/billing';
import IconCog from '@public/assets/icons/common/Cog.svg';

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
        label: 'Account Profile',
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
      <PageTitle title="Settings" icon={<IconCog />} />
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
