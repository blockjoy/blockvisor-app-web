import { _item, _item_price } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { chargebee } from './chargebeeInstance';

export async function fetchItems(id: string): Promise<{
  item: Item | null;
  itemPrices: ItemPrice[];
}> {
  const item: Item | null = await getItem(id);

  const itemPricesParams: _item_price.item_price_list_params = {
    item_id: { is: item?.id },
  };

  const itemPrices: ItemPrice[] = await listItemPrices(itemPricesParams);

  return { item, itemPrices };
}

export async function getItem(id: string): Promise<Item | null> {
  try {
    return new Promise((resolve, reject) => {
      chargebee.item
        .retrieve(id)
        .request(function (error: any, result: { item: Item }) {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(JSON.stringify(result.item)));
          }
        });
    });
  } catch (error: any) {
    console.error('Error', error);
    return Promise.reject(error);
  }
}

export async function listItemPrices(
  params: _item_price.item_price_list_params,
): Promise<ItemPrice[]> {
  try {
    return new Promise((resolve, reject) => {
      chargebee.item_price
        .list(params)
        .request(function (error: any, result: { list: ItemPrice[] }) {
          if (error) {
            reject(error);
          } else {
            const itemPrices = result.list.map(
              (listItem: any) => listItem.item_price as ItemPrice,
            );
            resolve(JSON.parse(JSON.stringify(itemPrices)));
          }
        });
    });
  } catch (error: any) {
    console.error('Error', error);
    return Promise.reject(error);
  }
}
