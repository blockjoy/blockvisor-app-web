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

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { modifyHost } = useHostUpdate();
  const { hostList } = useHostList();

  const createNode = async (
    nodeRequest: NodeServiceCreateRequest,
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
    const nodeProperties: any = nodeRequest.properties.map((property) => {
      const { uiType, ...rest } = property;
      return {
        ...rest,
        value: property?.value?.toString() || 'null',
        uiType: uiType,
      };
    });

    console.log('createNode Request', nodeRequest);

    try {
      const response: Node = await nodeClient.createNode({
        ...nodeRequest,
        properties: nodeProperties,
        network: nodeRequest.network,
      });

      const nodeId = response.id;

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

      toast.success('Node Created');
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
