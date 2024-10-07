import { nodeClient } from '@modules/grpc';
import { NodeServiceUpdateConfigRequest } from '@modules/grpc/library/blockjoy/v1/node';

export const useNodeUpdate = () => {
  const updateNode = async (updatedConfig: NodeServiceUpdateConfigRequest) => {
    try {
      await nodeClient.updateNode(updatedConfig);
    } catch (err: any) {
      console.log('Error Updating Node', err);
    }
  };

  return {
    updateNode,
  };
};
