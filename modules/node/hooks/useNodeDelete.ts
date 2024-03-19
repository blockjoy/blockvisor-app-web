import { useRecoilValue } from 'recoil';
import { nodeClient } from '@modules/grpc';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import {
  UpdateSubscriptionAction,
  generateError,
  useUpdateSubscriptionItems,
  billingSelectors,
} from '@modules/billing';

export function useNodeDelete() {
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );
  const bypassBillingForSuperUser = useRecoilValue(
    billingSelectors.bypassBillingForSuperUser,
  );

  const deleteNode = async (node: Node, onSuccess: VoidFunction) => {
    if (isEnabledBillingPreview && !bypassBillingForSuperUser)
      try {
        await updateSubscriptionItems({
          type: UpdateSubscriptionAction.REMOVE_NODE,
          payload: { node: node! },
        });
      } catch (error: any) {
        const errorMessage = generateError(error);
        console.log('Error occured while deleting a node', errorMessage);
        return;
      }

    await nodeClient.deleteNode(node?.id);

    onSuccess();
  };

  return {
    deleteNode,
  };
}
