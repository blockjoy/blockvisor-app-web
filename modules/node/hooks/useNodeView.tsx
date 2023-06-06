import { toast } from 'react-toastify';
import { nodeClient, commandClient } from '@modules/grpc';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeList } from './useNodeList';
import { checkForTokenError } from 'utils/checkForTokenError';
import { checkForApiError } from 'utils/checkForApiError';
import {
  Node,
  NodeServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;
  deleteNode: (args1: Args, onSuccess: VoidFunction) => void;
  stopNode: (nodeId: Args) => void;
  startNode: (nodeId: Args) => void;
  modifyNode: (node: Node) => void;
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
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { modifyOrganization } = useUpdateOrganization();

  const deleteNode = async (id: Args, onSuccess: VoidFunction) => {
    const uuid = convertRouteParamToString(id);
    removeFromNodeList(uuid);
    await nodeClient.deleteNode(uuid);
    // Update organization node count
    const activeOrganization = organizations.find(
      (org) => org.id === defaultOrganization?.id,
    );
    modifyOrganization({
      ...activeOrganization,
      nodeCount: activeOrganization!.nodeCount - 1,
    });
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
    let node: any;

    try {
      const nodeId = convertRouteParamToString(id);
      node = await nodeClient.getNode(nodeId);
      checkForApiError('GetNode', node);
      checkForTokenError(node);
    } catch (err) {
      setIsLoading('finished');
      onError();
      return;
    }

    setNode(node);
  };

  const unloadNode = () => {
    setNode(null);
    setIsLoading('loading');
  };

  const updateNode = async (nodeRequest: NodeServiceUpdateRequest) => {
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
  };
};
