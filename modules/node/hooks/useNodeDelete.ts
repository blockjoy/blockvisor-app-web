import { nodeClient } from '@modules/grpc';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export function useNodeDelete() {
  const deleteNode = async (node: Node, onSuccess: VoidFunction) => {
    await nodeClient.deleteNode(node?.id);

    onSuccess();
  };

  return {
    deleteNode,
  };
}
