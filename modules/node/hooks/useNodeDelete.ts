import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeClient } from '@modules/grpc';

export function useNodeDelete() {
  const deleteNode = async (
    node: Node,
    onSuccess: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    try {
      await nodeClient.deleteNode(node?.nodeId);

      onSuccess();
    } catch (err: any) {
      console.log('Error Deleting Node', err);
      onError?.('Error deleting node. Please try again.');
    }
  };

  return {
    deleteNode,
  };
}
