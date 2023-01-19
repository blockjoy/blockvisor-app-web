import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { apiClient } from '@modules/client';
import { authAtoms, useIdentityRepository } from '@modules/auth';

import { InitialQueryParams } from '../ui/NodeUIHelpers';
import { useGetBlockchains } from './useGetBlockchains';

interface Hook {
  nodeList: BlockjoyNode[] | null;
  loadNodes: (queryParams: InitialQueryParams, isNewUser?: boolean) => void;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
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

  const loadNodes = async (
    queryParams: InitialQueryParams,
    isNewUser?: boolean,
  ) => {
    if (isNewUser) {
      setIsLoading('finished');
      setNodeMetrics([
        { name: 3, value: '0' },
        { name: 4, value: '0' },
      ]);
      setTotalNodes(0);
      setNodeList([]);
      return;
    }

    const loadingState =
      queryParams.pagination.current_page === 1 ? 'initializing' : 'loading';
    setIsLoading(loadingState);

    console.log('loadNodes blockchains', blockchains);

    let blockchainList: any;
    if (!blockchains?.length) {
      blockchainList = await apiClient.getBlockchains();
    } else {
      blockchainList = blockchains;
    }

    setHasMore(false);

    // TODO: Org ID needs be set here
    const org_id = repository?.getIdentity()?.defaultOrganization?.id;
    // let org_id = user?.defaultOrganization?.id || '';

    console.log('-------------nodeUIProps-------------', queryParams);
    const nodes: any = await apiClient.listNodes(
      org_id!,
      queryParams.filter,
      queryParams.pagination,
    );

    console.log('listNodesResponse', nodes);

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
      const newNodes = [...nodeList!, ...nodes];
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
  };
};
