import { nodeClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useNodeList } from './useNodeList';
import {
  NodeServiceCreateRequest,
  Node,
} from '@modules/grpc/library/blockjoy/v1/node';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate } from '@modules/host';
import { useUpdateSubscription } from '@modules/billing';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { modifyHost } = useHostUpdate();
  const { hostList } = useHostList();
  const { updateSubscriptionItems } = useUpdateSubscription();

  const createNode = async (
    node: NodeServiceCreateRequest,
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
    const properties = node?.properties?.map((property) => ({
      ...property,
      value: property?.value?.toString() || 'null',
    }));

    const nodeRequest = {
      ...node,
      properties,
    };

    console.log('createNodeRequest', nodeRequest);

    try {
      const response: Node = await nodeClient.createNode(nodeRequest);

      const nodeId = response.id;

<<<<<<< HEAD
=======
      // Add node to the subscription
      await updateSubscriptionItems({
        type: 'create',
        payload: { node: response },
      });

      await keyFileClient.create(nodeId, keyFiles);

>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)
      // Update organization node count
      const activeOrganization = organizations.find(
        (org) => org.id === defaultOrganization?.id,
      );

      modifyOrganization({
        ...activeOrganization,
        nodeCount: activeOrganization!.nodeCount + 1,
      });

      const hostInList = hostList.find((h) => h.id === response.hostId);

      if (hostInList) {
        modifyHost({
          ...hostInList,
          nodeCount: hostInList.nodeCount + 1,
        });
      }

      toast.success('Node Launched');
      loadNodes();
      onSuccess(nodeId);
    } catch (err: any) {
      console.log('Error Launching Node', err);
      onError('Error launching node, an unknown error occurred.');
    }
  };

  return {
    createNode,
  };
};
