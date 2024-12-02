import {
  NodeServiceCreateRequest,
  Node,
} from '@modules/grpc/library/blockjoy/v1/node';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from '@modules/node';
import { useGetOrganizations } from '@modules/organization';
import { useHostList } from '@modules/host';
import { useInvoices, useSubscription } from '@modules/billing';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { getOrganizations } = useGetOrganizations();
  const { loadHosts } = useHostList();
  const { subscription, getSubscription } = useSubscription();
  const { getInvoices } = useInvoices();

  const createNode = async (
    node: NodeServiceCreateRequest,
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
    try {
      const response: Node = await nodeClient.createNode(node);

      loadNodes();
      loadHosts();
      getOrganizations();

      if (!subscription) getSubscription();
      getInvoices();

      onSuccess(response.nodeId);
    } catch (err: any) {
      console.log('Error Launching Node', err);
      onError('Error launching node, an unknown error occurred.');
    }
  };

  return {
    createNode,
  };
};
