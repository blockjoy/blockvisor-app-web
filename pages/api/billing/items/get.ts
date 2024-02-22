import { _item } from 'chargebee-typescript';
import { Item } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) => chargebee.item.retrieve(id);

const mappingCallback = (result: { item: Item }): Item | null => {
  const item = result.item as Item;

  return item;
};

const handler = createHandler<{ id: string }, { item: Item }, Item | null>(
  requestCallback,
  mappingCallback,
);

export default handler;
