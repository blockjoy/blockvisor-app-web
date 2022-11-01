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

interface Hook {
  loadNodes: () => void;
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
    console.log('args', args);
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodes = async () => {
    setIsLoading('loading');
    // TODO: Org ID needs be set here
    let org_id = user?.defaultOrganization?.id || '';

    const nodes: any = await apiClient.listNodes(org_id);

    setNodeList(nodes);

    await delay(env.loadingDuration);

    setIsLoading('finished');
  };

  useEffect(() => {
    if (nodeList?.length) {
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
