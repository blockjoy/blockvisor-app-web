import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
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

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const setHasMore = useSetRecoilState(nodeAtoms.hasMoreNodes);

  const setLayout = useSetRecoilState(layoutState);

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

    // TODO: Org ID needs be set here
    const org_id = repository?.getIdentity()?.defaultOrganization?.id;
    // let org_id = user?.defaultOrganization?.id || '';

    console.log('-------------nodeUIProps-------------', queryParams);

    const nodes: any = await apiClient.listNodes(
      org_id!,
      queryParams.filter,
      queryParams.pagination,
    );

    if (nodes.length) {
      if (queryParams.pagination.current_page === 1) {
        setNodeList(nodes);
      } else {
        const newNodes = [...nodeList, ...nodes];
        setNodeList(newNodes);
      }

      setHasMore(true);
    } else {
      setHasMore(false);
    }

    await delay(env.loadingDuration);

    setIsLoading('finished');
  };

  return {
    nodeList,
    loadNodes,
    handleAddNode,
    handleNodeClick,
  };
};
