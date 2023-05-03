import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { nodeClient } from '@modules/grpc';
import { useIdentityRepository } from '@modules/auth';
import { InitialQueryParams } from '../ui/NodeUIHelpers';
import { getInitialQueryParams } from '../ui/NodeUIContext';
import { useNodeMetrics } from './useNodeMetrics';
import { checkForTokenError } from 'utils/checkForTokenError';
import { ROUTES } from '@shared/constants/routes';

export const useNodeList = () => {
  const router = useRouter();
  const repository = useIdentityRepository();

  const setIsLoading = useSetRecoilState(nodeAtoms.isLoading);
  const setPreloadNodes = useSetRecoilState(nodeAtoms.preloadNodes);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const setHasMore = useSetRecoilState(nodeAtoms.hasMoreNodes);

  const { loadMetrics } = useNodeMetrics();

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

    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    const nodes: any = await nodeClient.listNodes(
      org_id!,
      queryParams.filter,
      queryParams.pagination,
    );

    checkForTokenError(nodes);

    setPreloadNodes(nodes.length);

    if (queryParams.pagination.current_page === 1) {
      // TODO: get total nodes from listNodes API and move metrics to separate component
      const totalNodes: number | undefined = await loadMetrics(true);

      if (totalNodes) total = totalNodes;
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
  };

  // const updateNodeList = async (node: BlockjoyNode) => {
  //   if (isUpdated.current) return;
  //   const isInRoute = Boolean(router.query.created);
  //   if (!isInRoute) return;
  //   const isInTheList = nodeList.some((nl) => nl.id === node.id);
  //   const isInTheQuery = isInQuery(node);
  //   if (!isInTheList && isInTheQuery) {
  //     setNodeList((prevNodeList) => [node, ...prevNodeList]);
  //   }
  //   await loadMetrics();
  //   removeQueryParams(router, ['created']);
  //   isUpdated.current = true;
  // };

  const addToNodeList = async (node: any) => {
    const newNodeList = [...nodeList, node];

    setNodeList(newNodeList);

    await loadMetrics();
  };

  const removeFromNodeList = async (nodeId: string) => {
    const newNodeList = nodeList.filter((nl) => nl.id !== nodeId);

    if (newNodeList.length !== nodeList.length) setNodeList(newNodeList);

    await loadMetrics();
  };

  return {
    nodeList,
    loadNodes,
    // updateNodeList,
    addToNodeList,
    removeFromNodeList,
    handleNodeClick,
    setIsLoading,
  };
};
