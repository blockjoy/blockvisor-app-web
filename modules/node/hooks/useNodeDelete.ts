import { useRecoilValue } from 'recoil';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate, useHostView } from '@modules/host';
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
    const uuid = id as string;
    removeFromNodeList(uuid);
    await nodeClient.deleteNode(uuid);
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

    onSuccess();

    const activeOrganization = organizations.find(
      (org) => org.id === defaultOrganization?.id,
    );

    modifyOrganization({
      ...activeOrganization,
      nodeCount: activeOrganization?.nodeCount! - 1,
    });

    const hostInList = hostList.find((h) => h.id === hostId);
    if (hostInList) {
      modifyHost({
        ...hostInList,
        nodeCount: hostInList.nodeCount - 1,
      });
    }
  };

  return {
    deleteNode,
  };
}
