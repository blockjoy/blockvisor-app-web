import { toast } from 'react-toastify';
import { nodeClient } from '@modules/grpc';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeList } from './useNodeList';
import {
  Node,
  NodeServiceUpdateConfigRequest,
} from '@modules/grpc/library/blockjoy/v1/node';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args) => Promise<void>;
  stopNode: (nodeId: Args) => void;
  startNode: (nodeId: Args) => void;
  modifyNode: (node: Node) => void;
  updateNode: (node: NodeServiceUpdateConfigRequest) => void;
  isLoading: boolean;
  unloadNode: any;
  node: Node | null;
  setIsLoading: SetterOrUpdater<LoadingState>;
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

  const { nodeList } = useNodeList();

  const stopNode = async (nodeId: Args) => {
    try {
      await nodeClient.stopNode(convertRouteParamToString(nodeId));
      toast.success(`Node Stopped`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  const startNode = async (nodeId: Args) => {
    try {
      await nodeClient.startNode(convertRouteParamToString(nodeId));
      toast.success(`Node Started`);
    } catch (err) {
      toast.error(`Node Start Failed`);
    }
  };

  const loadNode = async (id: Args) => {
    if (nodeList?.findIndex((n) => n.id === id)! > -1) {
      setIsLoading('finished');
      setNode(nodeList?.find((n) => n.id === id)!);
      return;
    }

    try {
      const nodeId = convertRouteParamToString(id);
      const node = await nodeClient.getNode(nodeId);
      setNode(node);
      setIsLoading('finished');
    } catch (err) {
      setIsLoading('finished');
      return;
    } finally {
    }
  };

  const unloadNode = () => setNode(null);

  const updateNode = async (nodeRequest: NodeServiceUpdateConfigRequest) => {
    try {
      await nodeClient.updateNode(nodeRequest);
      setNode({
        ...node!,
        ...nodeRequest,
      });
    } catch (err) {
      toast.error('Error Updating Node');
    }
  };

  const modifyNode = (mqttNode: Node) =>
    setNode({
      ...node!,
      ...mqttNode,
    });

  return {
    loadNode,
    stopNode,
    startNode,
    unloadNode,
    updateNode,
    modifyNode,
    node,
    isLoading: isLoading !== 'finished',
    setIsLoading,
  };
};
