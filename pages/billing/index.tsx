import { ReactNode } from 'react';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { _item } from 'chargebee-typescript';
import { AppLayout } from '@modules/layout';
import { Billing as BillingView } from '@modules/billing';
import { fetchItems } from 'utils/billing/fetchItems';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

const Billing = ({ item, itemPrices }: BillingProps) => (
  <BillingView item={item} itemPrices={itemPrices} />
);

Billing.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="Billing">{page}</AppLayout>;
};

export async function getStaticProps() {
  try {
    const { item, itemPrices } = await fetchItems('STANDARD');

    return { props: { item, itemPrices } };
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return { props: { item: null, itemPrices: [] } };
  }
}

export default Billing;
