import { toast } from 'react-toastify';
import { imageClient, nodeClient } from '@modules/grpc';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeList } from './useNodeList';
import {
  Node,
  NodeServiceUpdateConfigRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import {
  organizationSelectors,
  useSwitchOrganization,
} from '@modules/organization';
import { authSelectors } from '@modules/auth';
import { Image } from '@modules/grpc/library/blockjoy/v1/image';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args) => Promise<void>;
  stopNode: (nodeId: Args) => void;
  startNode: (nodeId: Args) => void;
  modifyNode: (node: Node) => void;
  updateNode: (
    node: NodeServiceUpdateConfigRequest,
    showSuccessToast?: boolean,
  ) => Promise<void>;
  isLoading: boolean;
  unloadNode: any;
  node: Node | null;
  nodeImage: Image | null;
  setIsLoading: SetterOrUpdater<LoadingState>;
};

const convertRouteParamToString = (id: Args) => {
  const uuid = id?.toString()!;
  return uuid;
};

export const useNodeView = (): Hook => {
  const { switchOrganization } = useSwitchOrganization();
  const { nodeList, modifyNodeInNodeList } = useNodeList();

  const [isLoading, setIsLoading] = useRecoilState(
    nodeAtoms.isLoadingActiveNode,
  );
  const [node, setNode] = useRecoilState(nodeAtoms.activeNode);
  const [nodeImage, setNodeImage] = useRecoilState(nodeAtoms.nodeImage);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

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
    let nextNode = nodeList?.find((n) => n.nodeId === id);

    if (nextNode) {
      setIsLoading('finished');
      if (!isSuperUser) {
        setNode(nextNode);
      } else {
        setNode(nextNode);
        nextNode = await nodeClient.getNode(id as string);
        setNode(nextNode);
      }

      if (nextNode.orgId !== defaultOrganization?.orgId)
        switchOrganization(nextNode.orgId, nextNode.orgName);

      try {
        const imageResponse = await imageClient.getImage({
          versionKey: nextNode.versionKey!,
          semanticVersion: nextNode.semanticVersion,
        });
        setNodeImage(imageResponse?.image!);
      } catch (err) {
        console.log('getImageError', err);
      }

      return;
    }

    try {
      const nodeId = convertRouteParamToString(id);
      nextNode = await nodeClient.getNode(nodeId);

      const { orgId, orgName, versionKey } = nextNode;

      setNode(nextNode);

      if (orgId !== defaultOrganization?.orgId)
        switchOrganization(orgId, orgName);

      const imageResponse = await imageClient.getImage({
        versionKey,
      });
      setNodeImage(imageResponse?.image!);

      setIsLoading('finished');
    } catch (err) {
      setNode(null);
    }
  };

  const unloadNode = () => setNode(null);

  const updateNode = async (
    nodeRequest: NodeServiceUpdateConfigRequest,
    showSuccessToast?: boolean,
  ) => {
    try {
      await nodeClient.updateNode(nodeRequest);

      const newNode = {
        ...node!,
        ...nodeRequest,
      };

      setNode(newNode);
      modifyNodeInNodeList(newNode);

      if (showSuccessToast) toast.success('Node Updated');

      return;
    } catch (err) {
      toast.error('Error Updating Node');
      return;
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
    nodeImage,
    isLoading: isLoading !== 'finished',
    setIsLoading,
  };
};
