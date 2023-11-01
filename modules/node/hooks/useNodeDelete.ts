import { useRecoilValue } from 'recoil';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate } from '@modules/host';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';
import {
  billingAtoms,
  generateError,
  UpdateSubscriptionAction,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { usePermissions } from '@modules/auth';

export function useNodeDelete() {
  const { removeFromNodeList } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { hostList } = useHostList();
  const { modifyHost } = useHostUpdate();
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const { isSuperUser } = usePermissions();
  const isSuperUserBilling = useRecoilValue(
    billingAtoms.isSuperUserBilling(isSuperUser),
  );

  const deleteNode = async (
    node: Node,
    hostId: string,
    onSuccess: VoidFunction,
  ) => {
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
