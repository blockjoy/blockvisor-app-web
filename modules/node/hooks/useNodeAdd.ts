import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';
import {
  NodeServiceCreateRequest,
  Node,
} from '@modules/grpc/library/blockjoy/v1/node';
import { useGetOrganizations } from '@modules/organization';
import { useHostList } from '@modules/host';
import {
  UpdateSubscriptionAction,
  billingAtoms,
  generateError,
  useUpdateSubscriptionItems,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';
import { useRecoilValue } from 'recoil';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { getOrganizations } = useGetOrganizations();
  const { loadHosts } = useHostList();

  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const { isSuperUser } = usePermissions();
  const isSuperUserBilling = useRecoilValue(
    billingAtoms.isSuperUserBilling(isSuperUser),
  );

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
