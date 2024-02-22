import { _item, _item_price } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  params,
}: {
  params: _item_price.item_price_list_params;
}) => {
  const { item_id } = params;

  if (!item_id || Object.keys(item_id).length === 0) {
    throw new Error('No Item ID provided');
  }

  return chargebee.item_price.list(params);
};

const mappingCallback = (result: { list: ItemPrice[] }): ItemPrice[] => {
  const itemPrices = result.list.map(
    (listItem: any) => listItem.item_price as ItemPrice,
  );

  return itemPrices;
};

const errorCallback = (error: any): [] | null => {
  if (error.message === 'No Item ID provided') {
    return [];
  }

  return null;
};

const handler = createHandler<
  { params: _item_price.item_price_list_params },
  { list: ItemPrice[] },
  ItemPrice[]
>(requestCallback, mappingCallback);

export default handler;
