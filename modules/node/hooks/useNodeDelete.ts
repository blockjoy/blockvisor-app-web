import { useRecoilValue } from 'recoil';
import { nodeClient } from '@modules/grpc';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import {
  UpdateSubscriptionAction,
  billingAtoms,
  generateError,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';

export function useNodeDelete() {
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const { isSuperUser } = usePermissions();
  const isSuperUserBilling = useRecoilValue(
    billingAtoms.isSuperUserBilling(isSuperUser),
  );

  const deleteNode = async (node: Node, onSuccess: VoidFunction) => {
    await nodeClient.deleteNode(node?.id);

    if (!isSuperUserBilling)
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

    onSuccess();
  };

  return {
    deleteNode,
  };
}
