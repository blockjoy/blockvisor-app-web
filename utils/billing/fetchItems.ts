import { BILLING_API_ROUTES } from '@modules/billing';
import { _item, _item_price } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';

async function postData<T = any>(
  url: string,
  data:
    | _item.item_list_params
    | _item_price.item_price_list_params
    | { id: string },
): Promise<T> {
  console.log(
    'URL123',
    `${
      process.env.NEXT_PUBLIC_URL || 'https://' + process.env.VERCEL_URL
    }${url}`,
  );

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL || 'https://' + process.env.VERCEL_URL
      }${url}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    console.log('response123', response);

    if (!response.ok) {
      console.error('Fetch Error:', response.statusText);
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchItem(params: { id: string }): Promise<{
  item: Item;
  itemPrices: ItemPrice[];
}> {
  const item: Item = await postData(BILLING_API_ROUTES.items.get, params);

  const itemPricesParams: _item_price.item_price_list_params = {
    item_id: { is: item.id },
  };

  const itemPrices: ItemPrice[] = await postData(
    BILLING_API_ROUTES.items.prices.list,
    itemPricesParams,
  );

  return { item, itemPrices };
}

export async function fetchItems(params: _item.item_list_params): Promise<{
  items: Item[];
  itemPrices: ItemPrice[];
}> {
  const items: Item[] = await postData(BILLING_API_ROUTES.items.list, params);

  const itemPricesParams: _item_price.item_price_list_params = {
    item_id: { is: items[0].id },
  };

  const itemPrices: ItemPrice[] = await postData(
    BILLING_API_ROUTES.items.prices.list,
    itemPricesParams,
  );

  return { items, itemPrices };
}
