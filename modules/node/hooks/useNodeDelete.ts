import { nodeClient } from '@modules/grpc';
import { useNodeList } from './useNodeList';

type Args = string | string[] | undefined;

export function useNodeDelete() {
  const deleteNode = async (id: Args, onSuccess: VoidFunction) => {
    const uuid = id as string;
    await nodeClient.deleteNode(uuid);
    onSuccess();
  };

  return {
    deleteNode,
  };
}
