import { ReactNode } from 'react';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { _item } from 'chargebee-typescript';
import { AppLayout } from '@modules/layout';
import { BillingView, DEFAULT_ITEM_ID } from '@modules/billing';
import { fetchItems } from 'utils/billing/fetchItems';
import { ProtectedRoute } from '@modules/auth';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

const Billing = ({ item, itemPrices }: BillingProps) => (
  <BillingView item={item} itemPrices={itemPrices} />
);

Billing.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppLayout pageTitle="Billing">
      <ProtectedRoute>{page}</ProtectedRoute>
    </AppLayout>
  );
};

export async function getStaticProps() {
  try {
    const { item, itemPrices } = await fetchItems(DEFAULT_ITEM_ID);

    return { props: { item, itemPrices } };
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return { props: { item: null, itemPrices: [] } };
  }
}

export default Billing;
