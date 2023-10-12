import { useRecoilValue } from 'recoil';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';
import {
  NodeServiceCreateRequest,
  Node,
} from '@modules/grpc/library/blockjoy/v1/node';
<<<<<<< HEAD
import { useGetOrganizations } from '@modules/organization';
import { useHostList } from '@modules/host';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { getOrganizations } = useGetOrganizations();
  const { loadHosts } = useHostList();
=======
import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate } from '@modules/host';
import {
  billingAtoms,
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
  const isSuperUserBilling = useRecoilValue(billingAtoms.isSuperUserBilling);
>>>>>>> cc5ac756 (feat: [sc-2861] bypassing billing for super admins)

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

    try {
<<<<<<< HEAD
      const response: Node = await nodeClient.createNode(nodeRequest);
<<<<<<< HEAD
=======

<<<<<<< HEAD
      const nodeId = response.id;
      // Add node to the subscription
      await updateSubscriptionItems({
        type: 'create',
        payload: { node: response },
      });

      await keyFileClient.create(nodeId, keyFiles);
=======
      try {
        await updateSubscriptionItems({
          type: UpdateSubscriptionAction.ADD_NODE,
          payload: { node: response },
        });
      } catch (error: any) {
        const errorMessage = generateError(error);
        onError(errorMessage);
        return;
      }
>>>>>>> 73fe8a78 (feat: [sc-2346] InvoicesList LazyLoad, caching via SWR and Context API)
=======
      if (!isSuperUserBilling)
        try {
          await updateSubscriptionItems({
            type: UpdateSubscriptionAction.ADD_NODE,
            payload: { node: nodeRequest },
          });
        } catch (error: any) {
          const errorMessage = generateError(error);
          onError(errorMessage);
          return;
        }

      const response: Node = await nodeClient.createNode(nodeRequest);
>>>>>>> aabaf5c2 (feat: [sc-2861] bypassing billing for super admins)

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
>>>>>>> cc5ac756 (feat: [sc-2861] bypassing billing for super admins)
      loadNodes();
      loadHosts();
      getOrganizations();
      onSuccess(response.id);
    } catch (err: any) {
      console.log('Error Launching Node', err);
      onError('Error launching node, an unknown error occurred.');
    }
  };

  return {
    createNode,
  };
};
