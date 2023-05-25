import { nodeClient, keyFileClient } from '@modules/grpc';
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

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();

  const createNode = async (
    nodeRequest: NodeServiceCreateRequest,
    keyFiles: File[],
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

      await keyFileClient.create(nodeId, keyFiles);

      // Update organization node count

      const activeOrganization = organizations.find(
        (org) => org.id === defaultOrganization?.id,
      );

      modifyOrganization({
        ...activeOrganization,
        nodeCount: activeOrganization!.nodeCount + 1,
      });

      toast.success('Node Created');
      loadNodes();
      onSuccess(nodeId);
    } catch (err: any) {
      onError(err.toString());
    }

    // try {

    // } catch (err) {
    //   let errorMessage =
    //     'Error launching node, please contact our support team.';
    //   if (response?.message?.includes('No free IP available')) {
    //     errorMessage = 'Error launching node, no free IP address available.';
    //   } else if (response?.message?.includes('User node quota exceeded')) {
    //     errorMessage = 'Unable to launch, node quota exceeded.';
    //   }
    //   onError(errorMessage);
    // }
  };

  return {
    createNode,
  };
};
