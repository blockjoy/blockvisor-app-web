import { toast } from 'react-toastify';
import { nodeClient, commandClient } from '@modules/grpc';
import { useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeList } from './useNodeList';
import { checkForTokenError } from 'utils/checkForTokenError';
import { checkForApiError } from 'utils/checkForApiError';
import {
  Node,
  NodeServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;
  deleteNode: (args1: Args, onSuccess: VoidFunction) => void;
  stopNode: (nodeId: Args) => void;
  startNode: (nodeId: Args) => void;
  updateNode: (node: NodeServiceUpdateRequest) => void;
  isLoading: boolean;
  unloadNode: any;
  node: Node | null;
};

const convertRouteParamToString = (id: Args) => {
  const uuid = id?.toString()!;
  return uuid;
};

export const useNodeView = (): Hook => {
  const [isLoading, setIsLoading] = useRecoilState(
    nodeAtoms.isLoadingActiveNode,
  );
  const [node, setNode] = useRecoilState(nodeAtoms.activeNode);
  const { removeFromNodeList } = useNodeList();

  const deleteNode = async (id: Args, onSuccess: VoidFunction) => {
    const uuid = convertRouteParamToString(id);
    removeFromNodeList(uuid);
    await nodeClient.deleteNode(uuid);
    onSuccess();
  };

  const stopNode = async (nodeId: Args) => {
    try {
      await commandClient.create('stopNode', convertRouteParamToString(nodeId));
      toast.success(`Node Stopped`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  const startNode = async (nodeId: Args) => {
    try {
      await commandClient.create(
        'startNode',
        convertRouteParamToString(nodeId),
      );
      toast.success(`Node Started`);
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

      console.log('loadNode', node);

      checkForApiError('GetNode', node);
      checkForTokenError(node);
    } catch (err) {
      setIsLoading(false);
      onError();
      return;
    }

    checkForTokenError(node);

    setNode(node);
  };

  const unloadNode = () => {
    setNode(null);
    setIsLoading(true);
  };

  const updateNode = (nodeRequest: NodeServiceUpdateRequest) => {
    nodeClient.updateNode(nodeRequest);
    setNode({
      ...node!,
      ...nodeRequest,
    });
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    startNode,
    unloadNode,
    updateNode,
    node,
    isLoading,
  };
};
