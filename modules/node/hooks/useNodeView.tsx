import { Uuid } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { formatDistanceToNow } from 'date-fns';
import { nodeTypeList } from '@shared/constants/lookups';
import { toast } from 'react-toastify';
import { apiClient } from '@modules/client';
import { useState } from 'react';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (args1: Args) => void;
  deleteNode: (args1: Args) => void;
  stopNode: (args1: Args) => void;
  restartNode: (args1: Args) => void;
  isLoading: boolean;
  node: BlockjoyNode;
};

const defaultNode: BlockjoyNode = {
  status: 0,
  name: '',
  id: '',
  hostId: '',
  ip: '',
  created: '',
  details: [],
};

const createUuid = (id: Args) => {
  const uuid = new Uuid();
  uuid.setValue(id?.toString() || '');
  return uuid;
};

export const useNodeView = (): Hook => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [node, setNode] = useState<BlockjoyNode>(defaultNode);

  const deleteNode = async (id: Args) => {
    await apiClient.execDeleteNode(createUuid(id));
    toast.success(`Node Deleted`);
  };

  const stopNode = async (id: Args) => {
    await apiClient.execDeleteNode(createUuid(id));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (id: Args) => {
    await apiClient.execStopNode(createUuid(node.hostId), createUuid(id));
    toast.success(`Node Restarted`);
  };

  const loadNode = async (id: Args) => {
    setIsLoading(true);

    const nodeId = createUuid(id);
    const node: any = await apiClient.getNode(nodeId);
    const nodeTypeId = JSON.parse(node.type).id;

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === nodeTypeId)?.name,
      },
      { label: 'WALLET ADDRESS', data: node.walletAddress },
      { label: 'VERSION', data: node.version || 'Latest' },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
    ];

    const activeNode: BlockjoyNode = {
      id: node.id.value,
      hostId: node.hostId.value,
      status: node.status,
      name: node.name,
      ip: node.ip,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
    };

    setNode(activeNode);

    await delay(env.loadingDuration);

    setIsLoading(false);
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
    node,
    isLoading,
  };
};
