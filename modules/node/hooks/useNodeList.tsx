import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useEffect, useState } from 'react';

import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { authAtoms } from '@modules/auth';

import { UIFilterCriteria as FilterCriteria } from '@modules/client/grpc_client';

interface Hook {
  nodeList: BlockjoyNode[];
  loadNodes: (filters?: FilterCriteria) => void;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);

  const [, setIsLoading] = useRecoilState(nodeAtoms.isLoading);

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);

  const setLayout = useSetRecoilState(layoutState);

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleNodeClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodes = async (filters?: FilterCriteria) => {
    console.log('loadNodes');

    setIsLoading('loading');
    // TODO: Org ID needs be set here
    let org_id = user?.defaultOrganization?.id || '';

    const nodes: any = await apiClient.listNodes(org_id, filters);

    console.log('nodes', nodes);

    setNodeList(nodes);

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
