import { BILLING_API_ROUTES } from '@modules/billing';
import { _item, _item_price } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';

async function postData<T = any>(
  url: string,
  data: _item.item_list_params | _item_price.item_price_list_params,
): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function fetchItems(): Promise<{
  items: Item[];
  itemPrices: ItemPrice[];
}> {
  const itemParams: _item.item_list_params = {
    id: { is: 'single-node' },
  };

  const items: Item[] = await postData(
    BILLING_API_ROUTES.items.list,
    itemParams,
  );

  const itemPricesParams: _item_price.item_price_list_params = {
    item_id: { is: items[0].id },
  };

  const itemPrices: ItemPrice[] = await postData(
    BILLING_API_ROUTES.items.prices.list,
    itemPricesParams,
  );

  return { items, itemPrices };
}
