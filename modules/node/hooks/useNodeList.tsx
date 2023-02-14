import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { apiClient } from '@modules/client';
import { useIdentityRepository } from '@modules/auth';
import { InitialQueryParams } from '../ui/NodeUIHelpers';
import { useRef } from 'react';
import { isInQuery } from '../utils/isInQuery';
import { getInitialQueryParams } from '../ui/NodeUIContext';
import { useNodeMetrics } from './useNodeMetrics';

interface Hook {
  nodeList: BlockjoyNode[];
  loadNodes: (queryParams?: InitialQueryParams) => Promise<void>;
  updateNodeList: (node: BlockjoyNode) => Promise<void>;
  removeNodeFromTheList: (nodeId: string) => Promise<void>;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const repository = useIdentityRepository();

  const setIsLoading = useSetRecoilState(nodeAtoms.isLoading);
  const setPreloadNodes = useSetRecoilState(nodeAtoms.preloadNodes);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const setHasMore = useSetRecoilState(nodeAtoms.hasMoreNodes);

  const setLayout = useSetRecoilState(layoutState);

  const isUpdated = useRef(false);

  const { loadMetrics } = useNodeMetrics();

  let total = 0;

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleNodeClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodes = async (queryParams?: InitialQueryParams) => {
    if (!queryParams) {
      const savedQueryParams = getInitialQueryParams();
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.current_page === 1 ? 'initializing' : 'loading';
    setIsLoading(loadingState);

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

  const updateNodeList = async (node: BlockjoyNode) => {
    const isInTheList = nodeList.some((nl) => nl.id === node.id);

    const isInTheQuery = isInQuery(node);

    if (!isInTheList && isInTheQuery && !isUpdated.current) {
      isUpdated.current = true;
      setNodeList((prevNodeList) => [node, ...prevNodeList]);
      await loadMetrics();
    }
  };

  const removeNodeFromTheList = async (nodeId: string) => {
    const newNodeList = nodeList.filter((nl) => nl.id !== nodeId);

    if (newNodeList.length !== nodeList.length) {
      setNodeList(newNodeList);
      await loadMetrics();
    }
  };

  return {
    nodeList,
    loadNodes,
    updateNodeList,
    removeNodeFromTheList,
    handleAddNode,
    handleNodeClick,
  };
};
