import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { PageSection, PageTitle } from '@shared/components';
import { ROUTES, TabItem, Tabs, useTabs } from '@shared/index';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { Overview, SUBSCRIPTION_TYPES } from '@modules/billing';

type BillingProps = {
  items: Item[];
  itemPrices: ItemPrice[];
};

export const Billing = ({ items, itemPrices }: BillingProps) => {
  const { push } = useRouter();

  // TODO: remove when old plans are deleted in chargebee
  const newItems = [...items].filter((item) =>
    SUBSCRIPTION_TYPES.includes(item.id),
  );
  const tabItems: TabItem[] = useMemo(
    () =>
      newItems.map((item: Item, index: number) => ({
        label: item?.external_name!,
        value: (index + 1).toString(),
        component: (
          <>
            <PageSection bottomBorder={false}>
              <Overview item={item} />
            </PageSection>
          </>
        ),
      })),
    [],
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
