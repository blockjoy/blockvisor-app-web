import { _item, _item_price } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  params,
}: {
  params: _item_price.item_price_list_params;
}) => chargebee.item_price.list(params);

const mappingCallback = (result: { list: ItemPrice[] }): ItemPrice[] => {
  const itemPrices = result.list.map(
    (listItem: any) => listItem.item_price as ItemPrice,
  );

  return itemPrices;
};

const handler = createHandler<
  { params: _item_price.item_price_list_params },
  { list: ItemPrice[] },
  ItemPrice[]
>(requestCallback, mappingCallback);

export default handler;
