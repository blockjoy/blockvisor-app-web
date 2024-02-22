import { _item, _item_price } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { chargebee } from './chargebeeInstance';
import { ItemPriceSimple } from '@modules/billing';

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

// TOOD: include nextOffset so all addons can be read
export async function fetchItemPrices() {
  const itemPricesParams: _item_price.item_price_list_params = {
    limit: 100,
    item_type: { is: 'addon' },
    item_id: { starts_with: 'FMN' },
  };

  const itemPricesMonthly: ItemPrice[] = await listItemPrices({
    ...itemPricesParams,
    period_unit: { is: 'month' },
  });

  const itemPricesYearly: ItemPrice[] = await listItemPrices({
    ...itemPricesParams,
    period_unit: { is: 'year' },
  });

  const itemPrices: ItemPriceSimple[] = [
    ...itemPricesMonthly,
    ...itemPricesYearly,
  ].map((itemPrice: ItemPrice) => ({
    id: itemPrice.id,
    item_id: itemPrice.item_id,
    price: itemPrice.price,
    currency_code: itemPrice.currency_code,
    period_unit: itemPrice.period_unit,
  }));

  return {
    itemPrices,
  };
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
