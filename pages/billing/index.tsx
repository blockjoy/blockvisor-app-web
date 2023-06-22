import { ReactNode } from 'react';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { _item } from 'chargebee-typescript';
import { AppLayout } from '@modules/layout';
import { Billing as BillingView } from '@modules/billing';
import { fetchItems } from 'utils/billing/fetchItems';

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
  const params: _item.item_list_params = {
    id: { is: 'standard' },
  };

  const { items, itemPrices } = await fetchItems(params);

  return { props: { items, itemPrices } };
}

export default Billing;
