import { nodeClient, keyFileClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useIdentityRepository } from '@modules/auth/hooks/useIdentityRepository';
import { useNodeList } from './useNodeList';
import {
  NodeServiceCreateRequest,
  Node,
  NodeScheduler_ResourceAffinity,
} from '@modules/grpc/library/blockjoy/v1/node';

export const useNodeAdd = () => {
  const repository = useIdentityRepository();

  const { loadNodes } = useNodeList();

  const createNode = async (
    params: NodeServiceCreateRequest,
    keyFiles: File[],
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
    const orgId = repository?.getIdentity()?.defaultOrganization?.id ?? '';

    const nodeProperties: any = params.properties.map((property) => {
      const { uiType, ...rest } = property;
      return {
        ...rest,
        // default: property.default === null ? 'null' : property.default,
        value: property?.value?.toString() || 'null',
        description: '',
        label: '',
        uiType: uiType,
      };
    });

    try {
      const response: Node = await nodeClient.createNode({
        orgId: orgId,
        blockchainId: params.blockchainId,
        version: params.version ?? '',
        nodeType: params.nodeType,
        properties: nodeProperties,
        network: params.network,
        allowIps: [],
        denyIps: [],
        placement: {
          scheduler: {
            resource:
              NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
          },
        },
      });

      response.allowIps;

      const nodeId = response!.id;

      await keyFileClient.create(nodeId, keyFiles);

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
