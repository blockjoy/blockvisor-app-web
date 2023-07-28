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
import {
  generateError,
  UpdateSubscriptionAction,
  useUpdateSubscriptionItems,
} from '@modules/billing';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { modifyHost } = useHostUpdate();
  const { hostList } = useHostList();
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();

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
      const nodeParams = {
        ...nodeRequest,
        properties: nodeProperties,
        network: nodeRequest.network,
      };

      // Only add to subscription if node is not hosted
      if (!nodeRequest.placement?.hostId)
        try {
          await updateSubscriptionItems({
            type: UpdateSubscriptionAction.ADD_NODE,
            payload: { node: nodeParams },
          });
        } catch (error: any) {
          const errorMessage = generateError(error);
          onError(errorMessage);
          return;
        }

      const response: Node = await nodeClient.createNode(nodeParams);

      const nodeId = response.id;

      // Add node to the subscription
      await updateSubscriptionItems({
        type: 'create',
        payload: { node: response },
      });

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
