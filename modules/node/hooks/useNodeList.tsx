import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { nodeClient } from '@modules/grpc';
import { InitialQueryParams } from '../ui/NodeUIHelpers';
import { getInitialQueryParams } from '../ui/NodeUIContext';
import { useDefaultOrganization } from '@modules/organization';

export const useNodeList = () => {
  const orgId = useDefaultOrganization().defaultOrganization?.id;

  const [isLoading, setIsLoading] = useRecoilState(nodeAtoms.isLoading);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);

  const [nodeCount, setNodeCount] = useRecoilState(nodeAtoms.nodeCount);

  const [nodeListByHost, setNodeListByHost] = useRecoilState(
    nodeAtoms.nodeListByHost,
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
      queryParams.pagination.current_page === 0 ? 'initializing' : 'loading';

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

      if (queryParams.pagination.current_page !== 0) {
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
  const listNodesByHost = async (hostId: string) => {
    setNodeListByHostLoadingState('initializing');

    const nodes: any = await nodeClient.listNodesByHost(orgId!, hostId);

    setNodeListByHost(nodes);

    setNodeListByHostLoadingState('finished');
  };

  const addToNodeList = (node: any) => {
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
    setIsLoading,
    listNodesByHost,
    nodeListByHost,
    nodeListByHostLoadingState,
  };
};
