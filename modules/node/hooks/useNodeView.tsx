import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { apiClient } from '@modules/client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';

import { useNodeList } from './useNodeList';
import { checkForTokenError } from 'utils/checkForTokenError';
import { checkForApiError } from 'utils/checkForApiError';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;
  deleteNode: (args1: Args) => void;
  stopNode: (nodeId: Args) => void;
  restartNode: (nodeId: Args) => void;
  isLoading: boolean;
  unloadNode: any;
  node: BlockjoyNode | null;
};

const createUuid = (id: Args) => {
  const uuid = id?.toString() || '';
  return uuid;
};

export const useNodeView = (): Hook => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [node, setNode] = useRecoilState(nodeAtoms.activeNode);
  const { removeFromNodeList } = useNodeList();

  const deleteNode = async (id: Args) => {
    const uuid = createUuid(id);
    await apiClient.deleteNode(uuid);
    removeFromNodeList(uuid);
    toast.success(`Node Deleted`);
  };

  const stopNode = async (nodeId: Args) => {
    await apiClient.execStopNode(createUuid(node?.hostId), createUuid(nodeId));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (nodeId: Args) => {
    await apiClient.execStartNode(createUuid(node?.hostId), createUuid(nodeId));
    toast.success(`Node Started`);
  };

  const loadNode = async (id: Args, onError: VoidFunction) => {
    setIsLoading(true);

    let node: any = null;

    try {
      const nodeId = createUuid(id);
      node = await apiClient.getNode(nodeId);

      checkForApiError('GetNode', node);
      checkForTokenError(node);
    } catch (err) {
      setIsLoading(false);
      onError();
      return;
    }

    checkForTokenError(node);

    const activeNode: BlockjoyNode = {
      ...node,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      propertiesList: node.propertiesList,
    };

    setNode(activeNode);

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
