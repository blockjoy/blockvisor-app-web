import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { nodeClient } from '@modules/grpc';
import { InitialQueryParams, Pagination } from '../ui/NodeUIHelpers';
import { getInitialQueryParams } from '../ui/NodeUIContext';
import { useDefaultOrganization } from '@modules/organization';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const useNodeList = () => {
  const orgId = useDefaultOrganization().defaultOrganization?.id;

  const [isLoading, setIsLoading] = useRecoilState(nodeAtoms.isLoading);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);

  const [nodeCount, setNodeCount] = useRecoilState(nodeAtoms.nodeCount);

  const [nodeListByHost, setNodeListByHost] = useRecoilState(
    nodeAtoms.nodeListByHost,
  );

  const [nodeListByHostCount, setNodeListByHostCount] = useRecoilState(
    nodeAtoms.nodeListByHostCount,
  );

  const [nodeListByHostLoadingState, setNodeListByHostLoadingState] =
    useRecoilState(nodeAtoms.isLoadingNodeListByHost);

  const loadNodes = async (
    queryParams?: InitialQueryParams,
    showLoader: boolean = true,
  ) => {
    if (!queryParams) {
      const savedQueryParams = getInitialQueryParams();
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.currentPage === 0 ? 'initializing' : 'loading';

    if (showLoader) {
      setIsLoading(loadingState);
    }

    try {
      const response = await nodeClient.listNodes(
        orgId!,
        queryParams.filter,
        queryParams.pagination,
      );

      const { nodeCount } = response;

      let nodes = response.nodes;

      setNodeCount(nodeCount);

      if (queryParams.pagination.currentPage !== 0) {
        nodes = [...nodeList!, ...nodes];
      }

      setNodeList(nodes);
      setIsLoading('finished');
    } catch (err) {
      setIsLoading('finished');
      setNodeList([]);
      setNodeCount(0);
    }
  };

  // TODO: improve/remove - maybe merge into loadNodes, but then we're in problem that if a user goes to the nodes in general
  // and in the nodes screen a user will see only the nodes belonging to the specific host
  // but we still don't have a default host, nor filter by hosts
  const listNodesByHost = async (hostId: string, pagination: Pagination) => {
    setNodeListByHostLoadingState('initializing');

    const response = await nodeClient.listNodesByHost(
      orgId!,
      hostId,
      pagination,
    );

    const { nodeCount } = response;

    setNodeListByHostCount(nodeCount);

    let nodes = response.nodes;

    if (pagination.currentPage !== 0) {
      nodes = [...nodeListByHost!, ...nodes];
    }

    setNodeListByHost(nodes);

    setNodeListByHostLoadingState('finished');
  };

  const modifyNodeInNodeList = (node: Node) => {
    const nodeListCopy = [...nodeList];

    const foundNodeIndex = nodeListCopy?.findIndex((n) => n.id === node.id);

    if (foundNodeIndex < 0) return;

    nodeListCopy[foundNodeIndex] = node;

    setNodeList(nodeListCopy);
  };

  const addToNodeList = (node: Node) => {
    const foundNode = nodeList?.findIndex((n) => n.id === node.id)! > -1;
    if (foundNode) return;

    const newNodeList = [node, ...nodeList!];

    setNodeCount(nodeCount + 1);
    setNodeList(newNodeList);
  };

  const removeFromNodeList = (nodeId: string) => {
    const newNodeList = nodeList?.filter((nl) => nl.id !== nodeId);

    if (newNodeList?.length !== nodeList?.length) {
      setNodeList(newNodeList);
      setNodeCount(nodeCount - 1);
    }
  };

  return {
    nodeList,
    nodeCount,
    loadNodes,
    isLoading,
    addToNodeList,
    removeFromNodeList,
    modifyNodeInNodeList,
    setIsLoading,
    listNodesByHost,
    nodeListByHost,
    nodeListByHostCount,
    nodeListByHostLoadingState,
  };
};
