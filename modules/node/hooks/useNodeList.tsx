import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useEffect, useState } from 'react';
import { NodeStatus } from '@modules/app/components/shared/node-status/NodeStatus';
import { TableBlockNodes } from '@modules/app/components/shared';
import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { nodeTypeList } from '@shared/constants/lookups';
import { organisationAtoms } from '@modules/organizations';

interface Hook {
  loadNodes: () => void;
  handleAddNode: () => void;
  handleRowClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();
  const defaultOrganization = useRecoilValue(
    organisationAtoms.defaultOrganization,
  );

  const [nodeRows, setNodeRows] = useRecoilState(nodeAtoms.nodeRows);
  const [isLoading, setIsLoading] = useRecoilState(nodeAtoms.isLoading);

  const setLayout = useSetRecoilState(layoutState);

  const [nodeList, setNodeList] = useState<BlockjoyNode[]>([]);

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleRowClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const loadNodes = async () => {
    setIsLoading(true);
    // TODO: Org ID needs be set here
    let org_id = defaultOrganization?.id || '';

    const nodes: any = await apiClient.listNodes(org_id);

    setNodeList(nodes);

    await delay(env.loadingDuration);

    setIsLoading(false);
  };

  useEffect(() => {
    if (nodeList?.length) {
      const rows = nodeList?.map((node: any) => ({
        key: node.id,
        cells: [
          {
            key: '1',
            component: (
              <>
                <TableBlockNodes
                  id={node.id.value}
                  name={node.name}
                  address={node.address}
                />
              </>
            ),
          },
          {
            key: '2',
            component: <NodeStatus status={node.status} />,
          },
        ],
      }));

      setNodeRows(rows);
    }
  }, [nodeList?.length]);

  return {
    loadNodes,
    handleAddNode,
    handleRowClick,
  };
};
