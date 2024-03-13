import { useRecoilValue } from 'recoil';
import { nodeClient } from '@modules/grpc';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import {
  UpdateSubscriptionAction,
  billingAtoms,
  generateError,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { authAtoms } from '@modules/auth';

export function useNodeDelete() {
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const isSuperUser = useRecoilValue(authAtoms.isSuperUser);
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );
  const bypassBillingForSuperUser = useRecoilValue(
    billingAtoms.bypassBillingForSuperUser(isSuperUser),
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
