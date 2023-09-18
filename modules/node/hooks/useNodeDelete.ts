import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate, useHostView } from '@modules/host';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';
import {
  UpdateSubscriptionAction,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';

type Args = string | string[] | undefined;

export function useNodeDelete() {
  const node = useRecoilValue(nodeAtoms.activeNode);
  const { removeFromNodeList } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { host } = useHostView();
  const { hostList } = useHostList();
  const { modifyHost } = useHostUpdate();
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();

  const deleteNode = async (
    id: Args,
    hostId: string,
    onSuccess: VoidFunction,
  ) => {
    const uuid = id as string;
    removeFromNodeList(uuid);
    await nodeClient.deleteNode(uuid);

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

    // TODO: RemoveNode probably doesn't work
    await updateSubscriptionItems({
      type: UpdateSubscriptionAction.REMOVE_NODE,
      payload: { node: node! },
    });
  };

  return {
    deleteNode,
  };
}
