import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { Node } from '@modules/app/components/node/Node';
import { formatDistanceToNow } from 'date-fns';
import { nodeTypeList } from '@shared/constants/lookups';
import { toast } from 'react-toastify';

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
  const { grpcClient } = app;

  const deleteNode = async (id: Args) => {
    await grpcClient.execDeleteNode(createNodeId(id));
    toast.success(`Node Deleted`);
  };

  const stopNode = async (id: Args) => {
    await grpcClient.execDeleteNode(createNodeId(id));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (id: Args) => {
    await grpcClient.execStopNode(createNodeId(id));
    toast.success(`Node Restarted`);
  };

  const loadNode = async (id: Args) => {
    setApp({
      ...app,
      nodeLoading: true,
    });

    const nodeId = createNodeId(id);

    const node: any = await grpcClient.getNode(nodeId);

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === node.type)?.name,
      },
      { label: 'WALLET ADDRESS', data: node.walletAddress },
      { label: 'VERSION', data: node.version },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
    ];

    const activeNode: Node = {
      id: node.id.value,
      status: node.status,
      name: node.name,
      ip: node.ip,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
    };

    setApp({
      ...app,
      node: activeNode,
      nodeLoading: false,
    });
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
  };
};
