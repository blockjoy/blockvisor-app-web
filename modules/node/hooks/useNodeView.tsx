import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { formatDistanceToNow } from 'date-fns';
import { nodeTypeList } from '@shared/constants/lookups';
import { toast } from 'react-toastify';
import { apiClient } from '@modules/client';
import { useState } from 'react';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (args1: Args) => void;
  deleteNode: (args1: Args) => void;
  stopNode: (args1: Args) => void;
  restartNode: (args1: Args) => void;
};

const createNodeId = (id: Args) => {
  const nodeId = new Uuid();
  nodeId.setValue(id?.toString() || '');
  return nodeId;
};

export const useNode = (): Hook => {
  const [app, setApp] = useRecoilState(appState);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedNode, setSelectedNode] = useState<BlockjoyNode>();

  const deleteNode = async (id: Args) => {
    await apiClient.execDeleteNode(createNodeId(id));
    toast.success(`Node Deleted`);
  };

  const stopNode = async (id: Args) => {
    await apiClient.execDeleteNode(createNodeId(id));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (id: Args) => {
    await apiClient.execStopNode(createNodeId(id));
    toast.success(`Node Restarted`);
  };

  const loadNode = async (id: Args) => {
    setApp({
      ...app,
      nodeLoading: true,
    });

    const nodeId = createNodeId(id);

    const node: any = await apiClient.getNode(nodeId);

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === node.type)?.name,
      },
      { label: 'WALLET ADDRESS', data: node.walletAddress },
      { label: 'VERSION', data: node.version },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
    ];

    const activeNode: BlockjoyNode = {
      id: node.id.value,
      status: node.status,
      name: node.name,
      ip: node.ip,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
    };

    setSelectedNode(activeNode);
    setIsLoading(false);
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
  };
};
