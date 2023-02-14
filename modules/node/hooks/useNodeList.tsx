import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, SetterOrUpdater } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { apiClient } from '@modules/client';
import { useIdentityRepository } from '@modules/auth';

import { InitialQueryParams } from '../ui/NodeUIHelpers';
import { useGetBlockchains } from './useGetBlockchains';
import { checkForTokenError } from 'utils/checkForTokenError';

interface Hook {
  nodeList: BlockjoyNode[];
  loadNodes: (queryParams: InitialQueryParams) => void;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
  setIsLoading: SetterOrUpdater<LoadingState>;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const repository = useIdentityRepository();

  const setIsLoading = useSetRecoilState(nodeAtoms.isLoading);
  const setPreloadNodes = useSetRecoilState(nodeAtoms.preloadNodes);

  const { blockchains } = useGetBlockchains();

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const setHasMore = useSetRecoilState(nodeAtoms.hasMoreNodes);

  const setLayout = useSetRecoilState(layoutState);

  const setNodeMetrics = useSetRecoilState(nodeAtoms.nodeMetrics);
  const [totalNodes, setTotalNodes] = useRecoilState(nodeAtoms.totalNodes);

  let total = totalNodes || 0;

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleNodeClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodes = async (queryParams: InitialQueryParams) => {
    const loadingState =
      queryParams.pagination.current_page === 1 ? 'initializing' : 'loading';
    setIsLoading(loadingState);

    let blockchainList: any;
    if (!blockchains?.length) {
      blockchainList = await apiClient.getBlockchains();
      checkForTokenError(blockchainList);
    } else {
      blockchainList = blockchains;
    }

    setHasMore(false);

    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    const nodes: any = await apiClient.listNodes(
      org_id!,
      queryParams.filter,
      queryParams.pagination,
    );

    setPreloadNodes(nodes.length);

    if (queryParams.pagination.current_page === 1) {
      // TODO: get total nodes from listNodes API and move metrics to separate component
      const metrics: any = await apiClient.getDashboardMetrics(org_id);
      setNodeMetrics(metrics);

      const _total: number = metrics.reduce(
        (accumulator: number, metric: NodeMetrics) => {
          const currentValue = parseInt(metric.value) ?? 0;
          return accumulator + currentValue;
        },
        0,
      );

      setTotalNodes(_total);
      total = _total;
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

  return {
    nodeList,
    loadNodes,
    handleAddNode,
    handleNodeClick,
    setIsLoading,
  };
};
