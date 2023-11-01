import { useRecoilValue } from 'recoil';
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
  billingAtoms,
  generateError,
  UpdateSubscriptionAction,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { modifyHost } = useHostUpdate();
  const { hostList } = useHostList();
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const { isSuperUser } = usePermissions();
  const isSuperUserBilling = useRecoilValue(
    billingAtoms.isSuperUserBilling(isSuperUser),
  );

  const createNode = async (
    node: NodeServiceCreateRequest,
    onSuccess: () => void,
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
      onSuccess();
    } catch (err: any) {
      console.log('Error Launching Node', err);
      onError('Error launching node, an unknown error occurred.');
    }
  };

  return {
    createNode,
  };
};
