import { toast } from 'react-toastify';
import { nodeClient, commandClient } from '@modules/grpc';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeList } from './useNodeList';
import { checkForTokenError } from 'utils/checkForTokenError';
import { checkForApiError } from 'utils/checkForApiError';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;
  deleteNode: (args1: Args) => void;
  stopNode: (nodeId: Args) => void;
  restartNode: (nodeId: Args) => void;
  isLoading: boolean;
  unloadNode: any;
  node: Node | null;
};

const convertRouteParamToString = (id: Args) => {
  const uuid = id?.toString()!;
  return uuid;
};

export const useNodeView = (): Hook => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [node, setNode] = useRecoilState(nodeAtoms.activeNode);
  const { removeFromNodeList } = useNodeList();

  const deleteNode = async (id: Args) => {
    const uuid = convertRouteParamToString(id);
    await nodeClient.deleteNode(uuid);
    removeFromNodeList(uuid);
    toast.success(`Node Deleted`);
  };

  const stopNode = async (nodeId: Args) => {
    try {
      await commandClient.create('stopNode', convertRouteParamToString(nodeId));
      toast.success(`Node Stopped`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  const restartNode = async (nodeId: Args) => {
    try {
      await commandClient.create(
        'startNode',
        convertRouteParamToString(nodeId),
      );
      toast.success(`Node Start`);
    } catch (err) {
      toast.error(`Node Start Failed`);
    }
  };

  const loadNode = async (id: Args, onError: VoidFunction) => {
    setIsLoading(true);

    let node: any;

    try {
      const nodeId = convertRouteParamToString(id);
      node = await nodeClient.getNode(nodeId);
      checkForApiError('GetNode', node);
      checkForTokenError(node);
    } catch (err) {
      setIsLoading(false);
      onError();
      return;
    }

    checkForTokenError(node);

    setNode(node);

    setIsLoading(false);
  };

  const unloadNode = () => {
    setNode(null);
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
    unloadNode,
    node,
    isLoading,
  };
};
