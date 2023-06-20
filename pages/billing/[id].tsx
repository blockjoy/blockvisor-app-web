import { SubscriptionView } from '@modules/billing/components/Subscription/SubscriptionView';
import { AppLayout } from '@modules/layout';
import { _item } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { fetchItem, fetchItems } from 'utils/billing/fetchItems';

type BillingPageProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

const BillingPage = ({ item, itemPrices }: BillingPageProps) => (
  <SubscriptionView item={item} itemPrices={itemPrices} />
);

BillingPage.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Organization">{page}</AppLayout>;
};

export async function getStaticProps({ params }: any) {
  const { item, itemPrices } = await fetchItem(params);

  return { props: { item, itemPrices } };
}

export async function getStaticPaths() {
  const params: _item.item_list_params = {
    item_family_id: { is: 'default' },
  };

  const { items } = await fetchItems(params);
  const paths = [...items].map((item: Item) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default BillingPage;
