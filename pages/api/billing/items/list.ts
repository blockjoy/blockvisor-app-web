import { _item } from 'chargebee-typescript';
import { Item } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ params }: { params: _item.item_list_params }) =>
  chargebee.item.list(params);

const mappingCallback = (result: { list: Item[] }): Item[] => {
  const items = result.list.map((listItem: any) => listItem.item as Item);

  return items;
};

const handler = createHandler<
  { params: _item.item_list_params },
  { list: Item[] },
  Item[]
>(requestCallback, mappingCallback);

export default handler;
