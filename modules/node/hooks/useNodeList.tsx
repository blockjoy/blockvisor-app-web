import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useEffect, useState } from 'react';

import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { authAtoms } from '@modules/auth';
import { toRows } from '../utils/toRows';
import { toGrid } from '../utils/toGrid';
import { UIFilterCriteria as FilterCriteria } from '@modules/client/grpc_client';

interface Hook {
  loadNodes: (filters?: FilterCriteria) => void;
  handleAddNode: () => void;
  handleNodeClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);

  const activeListType = useRecoilValue(nodeAtoms.activeListType);

  const [, setNodeRows] = useRecoilState(nodeAtoms.nodeRows);
  const [, setNodeCells] = useRecoilState(nodeAtoms.nodeCells);
  const [, setIsLoading] = useRecoilState(nodeAtoms.isLoading);

  const setLayout = useSetRecoilState(layoutState);

  const [nodeList, setNodeList] = useState<BlockjoyNode[]>([]);

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleNodeClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodes = async (filters?: FilterCriteria) => {
    setIsLoading('loading');
    // TODO: Org ID needs be set here
    let org_id = user?.defaultOrganization?.id || '';

    const nodes: any = await apiClient.listNodes(org_id, filters);

    console.log('nodes', nodes);

    setNodeList(nodes);

    await delay(env.loadingDuration);

    setIsLoading('finished');
  };

  console.log('nodeList', nodeList.length);

  useEffect(() => {
    console.log('WTF');

    if (nodeList?.length) {
      console.log('TEST!!', activeListType);

      if (activeListType === 'table') {
        const rows = toRows(nodeList);
        setNodeRows(rows!);
      } else {
        const cells = toGrid(nodeList, handleNodeClick);
        console.log('cells', cells);
        setNodeCells(cells!);
      }
    }
  }, [nodeList?.length, activeListType]);

  return {
    loadNodes,
    handleAddNode,
    handleNodeClick,
  };
};
