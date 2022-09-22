import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useEffect, useState } from 'react';
import { NodeStatus } from '@modules/app/components/shared/node-status/NodeStatus';
import { Header, Row } from '@modules/app/components/shared/table/Table';
import { TableBlockNodes } from '@modules/app/components/shared';
import { apiClient } from '@modules/client';
import { Uuid } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { delay } from '@shared/utils/delay';

interface Hook {
  loadNodes: () => void;
  handleAddNode: () => void;
  handleRowClick: (args1: any) => void;
}

export const useNodeList = (): Hook => {
  const router = useRouter();

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
    let org_id = new Uuid();
    org_id.setValue(process.env.NEXT_PUBLIC_ORG_ID || '');
    const nodes: any = await apiClient.listNodes(org_id);

    setNodeList(nodes);

    console.log('nodes', nodes);

    await delay(400);

    setIsLoading(false);
  };

  useEffect(() => {
    if (nodeList?.length) {
      console.log('nodeList has changed', nodeList);
      const rows = nodeList?.map((node: any) => ({
        key: node.id.value,
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
