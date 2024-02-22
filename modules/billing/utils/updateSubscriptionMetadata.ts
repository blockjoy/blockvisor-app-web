import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { UpdateSubscriptionAction } from '@modules/billing';

export const updateSubscriptionMetadata = (
  type: UpdateSubscriptionAction,
  payload: {
    metadata: SubscriptionMetadata;
    resource?: Node | Host;
    itemPriceID?: string;
  },
) => {
  const { metadata, resource, itemPriceID } = payload;

  let newSubscriptionItems = [...(metadata?.subscriptionItems ?? [])];

  switch (type) {
    case UpdateSubscriptionAction.ADD_NODE:
      if (resource?.id && itemPriceID) {
        newSubscriptionItems.push({
          id: resource?.id,
          createdAt: resource?.createdAt,
          itemPriceID,
        });
      }
      break;
    case UpdateSubscriptionAction.REMOVE_NODE:
      newSubscriptionItems = newSubscriptionItems.filter(
        (item: SubscriptionMetadataItem) => item.id !== resource?.id,
      );
      break;
    default:
      break;
  }

  const newMetadata = {
    ...metadata,
    subscriptionItems: newSubscriptionItems,
  };

  return newMetadata;
};
