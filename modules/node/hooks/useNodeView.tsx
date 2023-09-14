import { toast } from 'react-toastify';
import { nodeClient } from '@modules/grpc';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeList } from './useNodeList';
import { checkForTokenError } from 'utils/checkForTokenError';
import { checkForApiError } from 'utils/checkForApiError';
import {
  Node,
  NodeServiceUpdateConfigRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { usePermissions } from '@modules/auth';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;

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

  const { hasPermission } = usePermissions();

  const canStopNode = hasPermission('node-stop');
  const canStartNode = hasPermission('node-start');
  const canLoadNode = hasPermission('node-get');
  const canUpdateNode = hasPermission('node-update-config');

  const { nodeList } = useNodeList();

  const stopNode = async (nodeId: Args) => {
    if (!canStopNode) {
      toast.error('You have no permission to stop nodes');
      return;
    }

    try {
      await nodeClient.stopNode(convertRouteParamToString(nodeId));
      toast.success(`Node Stopped`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  const startNode = async (nodeId: Args) => {
    if (!canStartNode) {
      toast.error('You have no permission to start nodes');
      return;
    }

    try {
      await nodeClient.startNode(convertRouteParamToString(nodeId));
      toast.success(`Node Started`);
    } catch (err) {
      toast.error(`Node Start Failed`);
    }
  };

  const loadNode = async (id: Args, onError: VoidFunction) => {
    if (!canLoadNode) {
      toast.error('You have no permission to load nodes');
      return;
    }

    if (nodeList.findIndex((n) => n.id === id) > -1) {
      setIsLoading('finished');
      setNode(nodeList.find((n) => n.id === id)!);
      return;
    }

    try {
      const nodeId = convertRouteParamToString(id);
      const node: any = await nodeClient.getNode(nodeId);
      checkForApiError('GetNode', node);
      checkForTokenError(node);
      setNode(node);
      setIsLoading('finished');
    } catch (err) {
      setIsLoading('finished');
      onError();
      return;
    } finally {
    }
  };

  //TODO: permission for unload node
  const unloadNode = () => setNode(null);

  const updateNode = async (nodeRequest: NodeServiceUpdateConfigRequest) => {
    if (!canUpdateNode) {
      toast.error('You have no permission to update nodes');
      return;
    }

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

  //TODO: permission for modify node
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
