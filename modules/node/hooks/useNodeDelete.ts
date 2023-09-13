import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate, useHostView } from '@modules/host';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';

type Args = string | string[] | undefined;

export function useNodeDelete() {
  const { removeFromNodeList } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { host } = useHostView();
  const { hostList } = useHostList();
  const { modifyHost } = useHostUpdate();

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
  };

  return {
    deleteNode,
  };
}
