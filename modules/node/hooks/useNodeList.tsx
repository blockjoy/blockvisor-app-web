import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { apiClient } from '@modules/client';
import { authAtoms, useIdentityRepository } from '@modules/auth';

import { InitialQueryParams } from '../ui/NodeUIHelpers';

interface Hook {
  nodeList: BlockjoyNode[];
  loadNodes: (queryParams: InitialQueryParams) => void;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);
  const repository = useIdentityRepository();

  const setIsLoading = useSetRecoilState(nodeAtoms.isLoading);
  const setPreloadNodes = useSetRecoilState(nodeAtoms.preloadNodes);

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

    setHasMore(false);

    // TODO: Org ID needs be set here
    const org_id = repository?.getIdentity()?.defaultOrganization?.id;
    // let org_id = user?.defaultOrganization?.id || '';

    // temp fix to get blockchain name from ID
    const blockchains: any = await apiClient.getBlockchains();

    console.log('-------------nodeUIProps-------------', queryParams);
    const nodesResponse: any = await apiClient.listNodes(
      org_id!,
      queryParams.filter,
      queryParams.pagination,
    );

    const nodes = nodesResponse?.map((n: any) => ({
      ...n,
      blockchainName:
        blockchains?.find((b: any) => b.id === n.blockchainId)?.name || '-',
    }));

    console.log('listNodes', nodes);

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
    if (!(nodes.length === 0 || queryParams.pagination.current_page === 1))
      await new Promise((r) => setTimeout(r, 600));

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
  };
};
