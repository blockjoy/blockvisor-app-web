import { useRecoilState } from 'recoil';
import { nodeClient } from '@modules/grpc';
import { NodeServiceUpdateConfigRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeAtoms } from '@modules/node';

export const useNodeUpdate = () => {
  const [nodeLoadingState, setNodeLoadingState] = useRecoilState(
    nodeAtoms.nodeLoadingState,
  );

  const updateNode = async (updatedConfig: NodeServiceUpdateConfigRequest) => {
    try {
      setNodeLoadingState('initializing');
      await nodeClient.updateNode(updatedConfig);
    } catch (err: any) {
      console.log('Error Updating Node', err);
    } finally {
      setNodeLoadingState('finished');
    }
  };

  return {
    updateNode,
    nodeLoadingState,
  };
};
