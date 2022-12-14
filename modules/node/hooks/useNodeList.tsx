import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { authAtoms, useIdentityRepository } from '@modules/auth';

import {
  UIFilterCriteria as FilterCriteria,
  UIPagination,
} from '@modules/client/grpc_client';

export type LoadNodeParams = {
  filters?: FilterCriteria;
  pagination?: UIPagination;
};
interface Hook {
  nodeList: BlockjoyNode[];
  loadNodes: (params?: LoadNodeParams) => void;
  loadNodesPaginated: (params?: LoadNodeParams) => void;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);
  const repository = useIdentityRepository();

  const [, setIsLoading] = useRecoilState(nodeAtoms.isLoading);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);

  const setLayout = useSetRecoilState(layoutState);

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleNodeClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodesPaginated = async (params?: LoadNodeParams) => {
    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    // let org_id = user?.defaultOrganization?.id || '';

    const nodes: any = await apiClient.listNodes(
      org_id!,
      params?.filters,
      params?.pagination,
    );

    console.log('paginated nodes', nodes);

    setNodeList((prev) => [...prev, ...nodes]);
  };

  const loadNodes = async (params?: LoadNodeParams) => {
    setIsLoading('loading');
    // TODO: Org ID needs be set here

    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    // let org_id = user?.defaultOrganization?.id || '';

    const nodes: any = await apiClient.listNodes(
      org_id!,
      params?.filters,
      params?.pagination,
    );

    setNodeList(nodes);

    await delay(env.loadingDuration);

    setIsLoading('finished');
  };

  return {
    nodeList,
    loadNodes,
    handleAddNode,
    handleNodeClick,
    loadNodesPaginated,
  };
};
