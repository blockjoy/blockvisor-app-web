import { AppLayout } from '@modules/layout';
import { Billing as BillingView } from '@modules/billing';
import { fetchItems } from 'utils/billing/fetchItems';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { ReactNode } from 'react';

type BillingProps = {
  items: Item[];
  itemPrices: ItemPrice[];
};

const Billing = ({ items, itemPrices }: BillingProps) => (
  <BillingView items={items} itemPrices={itemPrices} />
);

Billing.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="Billing">{page}</AppLayout>;
};

export async function getStaticProps() {
  const { items, itemPrices } = await fetchItems();

  return { props: { items, itemPrices } };
}

export default Billing;
