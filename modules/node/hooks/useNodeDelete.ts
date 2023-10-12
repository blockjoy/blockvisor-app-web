<<<<<<< HEAD
=======
import { useRecoilValue } from 'recoil';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate, useHostView } from '@modules/host';
>>>>>>> cc5ac756 (feat: [sc-2861] bypassing billing for super admins)
import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';
<<<<<<< HEAD

type Args = string | string[] | undefined;
=======
import {
  billingAtoms,
  generateError,
  UpdateSubscriptionAction,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
>>>>>>> aabaf5c2 (feat: [sc-2861] bypassing billing for super admins)

export function useNodeDelete() {
<<<<<<< HEAD
  const deleteNode = async (id: Args, onSuccess: VoidFunction) => {
=======
  const { removeFromNodeList } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { host } = useHostView();
  const { hostList } = useHostList();
  const { modifyHost } = useHostUpdate();
<<<<<<< HEAD
=======
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const isSuperUserBilling = useRecoilValue(billingAtoms.isSuperUserBilling);
>>>>>>> aabaf5c2 (feat: [sc-2861] bypassing billing for super admins)

  const deleteNode = async (
    id: Args,
    hostId: string,
    onSuccess: VoidFunction,
  ) => {
<<<<<<< HEAD
>>>>>>> cc5ac756 (feat: [sc-2861] bypassing billing for super admins)
    const uuid = id as string;
    await nodeClient.deleteNode(uuid);
<<<<<<< HEAD
=======
=======
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

    await nodeClient.deleteNode(node?.id);
    removeFromNodeList(node?.id);
>>>>>>> aabaf5c2 (feat: [sc-2861] bypassing billing for super admins)

>>>>>>> cc5ac756 (feat: [sc-2861] bypassing billing for super admins)
    onSuccess();
  };

  return {
    deleteNode,
  };
}
