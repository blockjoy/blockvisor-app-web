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

  const { itemPrices } = await listItemPrices(itemPricesParams);

  return { item, itemPrices };
}

export async function fetchItemPrices() {
  const itemPricesParams: _item_price.item_price_list_params = {
    limit: 100,
    item_type: { is: 'addon' },
    item_id: { starts_with: 'FMN' },
  };

  let allItemPrices: ItemPriceSimple[] = [];

  async function fetchPricesRecursively(
    params: _item_price.item_price_list_params,
    offset?: string,
  ) {
    if (offset) {
      params['offset'] = offset;
    }

    const { itemPrices, nextOffset } = await listItemPrices({
      ...params,
      period_unit: { is: 'month' },
    });

    const simplifiedItemPrices = itemPrices.map((itemPrice) => ({
      id: itemPrice.id,
      item_id: itemPrice.item_id,
      // @ts-ignore
      price_variant_id: itemPrice.price_variant_id,
      price: itemPrice.price,
      currency_code: itemPrice.currency_code,
      period_unit: itemPrice.period_unit,
    }));

    allItemPrices = allItemPrices.concat(simplifiedItemPrices);

    if (nextOffset) {
      await fetchPricesRecursively(params, nextOffset);
    }
  }

  await fetchPricesRecursively(itemPricesParams);

  return {
    itemPrices: allItemPrices,
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
            resolve(structuredClone(result.item));
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
): Promise<{ itemPrices: ItemPrice[]; nextOffset: string }> {
  try {
    return new Promise((resolve, reject) => {
      chargebee.item_price
        .list(params)
        .request(function (
          error: any,
          result: { list: ItemPrice[]; next_offset: string },
        ) {
          if (error) {
            reject(error);
          } else {
            const itemPrices = result.list.map(
              (listItem: any) => listItem.item_price as ItemPrice,
            );
            resolve(
              structuredClone({ itemPrices, nextOffset: result.next_offset }),
            );
          }
        });
    });
  } catch (error: any) {
    console.error('Error', error);
    return Promise.reject(error);
  }
}
