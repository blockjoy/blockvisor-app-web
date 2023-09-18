import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate } from '@modules/host';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';
import {
  UpdateSubscriptionAction,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export function useNodeDelete() {
  const { removeFromNodeList } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { hostList } = useHostList();
  const { modifyHost } = useHostUpdate();
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();

  const deleteNode = async (
    node: Node,
    hostId: string,
    onSuccess: VoidFunction,
  ) => {
    removeFromNodeList(node?.id);
    await nodeClient.deleteNode(node?.id);

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

    await updateSubscriptionItems({
      type: UpdateSubscriptionAction.REMOVE_NODE,
      payload: { node: node! },
    });
  };

  return {
    deleteNode,
  };
}
