import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { nodeClient } from '@modules/grpc';
import { InitialQueryParams } from '../ui/NodeUIHelpers';
import { getInitialQueryParams } from '../ui/NodeUIContext';
import { checkForTokenError } from 'utils/checkForTokenError';
import { ROUTES } from '@shared/constants/routes';
import { useDefaultOrganization } from '@modules/organization';

export const useNodeList = () => {
  const router = useRouter();

  const orgId = useDefaultOrganization().defaultOrganization?.id;

  const [isLoading, setIsLoading] = useRecoilState(nodeAtoms.isLoading);
  const setPreloadNodes = useSetRecoilState(nodeAtoms.preloadNodes);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);

  const [nodeCount, setNodeCount] = useRecoilState(nodeAtoms.nodeCount);

  const setHasMore = useSetRecoilState(nodeAtoms.hasMoreNodes);

  const [nodeListByHost, setNodeListByHost] = useRecoilState(
    nodeAtoms.nodeListByHost,
  );
  const [nodeListByHostLoadingState, setNodeListByHostLoadingState] =
    useRecoilState(nodeAtoms.isLoadingNodeListByHost);

  let total = 0;

  const handleNodeClick = (args: any) => {
    router.push(ROUTES.NODE(args.key));
  };

  const loadNodes = async (
    queryParams?: InitialQueryParams,
    showLoader: boolean = true,
  ) => {
    if (!queryParams) {
      const savedQueryParams = getInitialQueryParams();
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.current_page === 1 ? 'initializing' : 'loading';

    if (showLoader) {
      setIsLoading(loadingState);
    }

    setHasMore(false);

    try {
      const response: any = await nodeClient.listNodes(
        orgId!,
        queryParams.filter,
        queryParams.pagination,
      );

      setNodeCount(response.nodeCount);

      const nodes = response.nodes;

      checkForTokenError(nodes);

      setPreloadNodes(nodes.length);

      if (queryParams.pagination.current_page === 1) {
        // TODO: get total nodes from listNodes API and move metrics to separate component
        // const totalNodes: number | undefined = await loadMetrics(true);
        // if (totalNodes) total = totalNodes;
      }

      // TODO: (maybe) remove - added for better UI
      // if (!(nodes.length === 0 || queryParams.pagination.current_page === 1))
      //   await new Promise((r) => setTimeout(r, 600));

      if (queryParams.pagination.current_page === 1) {
        setNodeList(nodes);
      } else {
        const newNodes = [...nodeList, ...nodes];
        setNodeList(newNodes);
      }

      // TODO: has to be improved once the total nodes count is received (doesn't work with filtering)
      const hasMoreNodes =
        queryParams.pagination.current_page *
          queryParams.pagination.items_per_page <
        (total ?? Infinity);

      setHasMore(hasMoreNodes);

      setPreloadNodes(0);

      setIsLoading('finished');
    } catch (err) {
      setIsLoading('finished');
      setNodeList([]);
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

  const addToNodeList = async (node: any) => {
    const newNodeList = [...nodeList, node];

    setNodeCount(nodeCount + 1);

    setNodeList(newNodeList);
  };

  const removeFromNodeList = async (nodeId: string) => {
    const newNodeList = nodeList.filter((nl) => nl.id !== nodeId);

    if (newNodeList.length !== nodeList.length) {
      setNodeList(newNodeList);
    }

    setNodeCount(nodeCount - 1);
  };

  return {
    nodeList,
    nodeCount,
    loadNodes,
    isLoading,
    addToNodeList,
    removeFromNodeList,
    handleNodeClick,
    setIsLoading,
    listNodesByHost,
    nodeListByHost,
    nodeListByHostLoadingState,
  };
};
