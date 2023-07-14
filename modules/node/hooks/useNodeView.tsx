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
import {
  useDefaultOrganization,
  useGetOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useHostList, useHostUpdate, useHostView } from '@modules/host';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;
  deleteNode: (nodeId: Args, hostId: string, onSuccess: VoidFunction) => void;
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
  const { removeFromNodeList, nodeList } = useNodeList();
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();
  const { host } = useHostView();
  const { hostList } = useHostList();
  const { modifyHost } = useHostUpdate();

  const deleteNode = async (
    id: Args,
    hostId: string,
    onSuccess: VoidFunction,
  ) => {
    const uuid = convertRouteParamToString(id);
    removeFromNodeList(uuid);
    await nodeClient.deleteNode(uuid);

    const activeOrganization = organizations.find(
      (org) => org.id === defaultOrganization?.id,
    );
    modifyOrganization({
      ...activeOrganization,
      nodeCount: activeOrganization?.nodeCount! - 1,
    });

    const hostInList = hostList.find((h) => h.id === node?.hostId);
    if (hostInList) {
      modifyHost({
        ...hostInList,
        nodeCount: hostInList.nodeCount - 1,
      });
    }

    onSuccess();
  };

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

  const loadNode = async (id: Args, onError: VoidFunction) => {
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
    deleteNode,
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
