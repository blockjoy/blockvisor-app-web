import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useEffect, useState } from 'react';
import { NodeStatus } from '@modules/app/components/shared/node-status/NodeStatus';
import { Header, Row } from '@modules/app/components/shared/table/Table';
import { TableBlockNodes } from '@modules/app/components/shared';
import { apiClient } from '@modules/client';
import { Uuid } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';

interface TableState {
  rows?: Row[];
  headers?: Header[];
}

interface Hook extends TableState {
  loadNodes: () => void;
  handleAddNode: () => void;
  handleRowClick: (args1: any) => void;
  isLoading: boolean;
  nodeList: BlockjoyNode[];
}

export const useNodeList = (): Hook => {
  const router = useRouter();

  const setLayout = useSetRecoilState(layoutState);

  const [tableState, setTableState] = useState<TableState>({
    rows: [],
    headers: [],
  });

  const { rows } = tableState;

  const [isLoading, setIsLoading] = useState(true);

  const [nodeList, setNodeList] = useState<BlockjoyNode[]>([]);

  const handleAddNode = () => {
    setLayout('nodes');
  };

  const handleRowClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const headers = [
    {
      name: 'Name',
      key: '1',
    },
    {
      name: 'Status',
      key: '2',
    },
  ];

  const loadNodes = async () => {
    setIsLoading(true);
    // TODO: Org ID needs be set here
    let org_id = new Uuid();
    org_id.setValue(process.env.NEXT_PUBLIC_ORG_ID || '');
    const nodes: any = await apiClient.listNodes(org_id);

    setNodeList(nodes);
    setIsLoading(false);
  };

  useEffect(() => {
    if (nodeList?.length) {
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
                  address="test"
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

      setTableState({
        rows,
      });
    }
  }, [nodeList?.length]);

  return {
    loadNodes,
    handleAddNode,
    handleRowClick,
    headers,
    rows,
    nodeList,
    isLoading,
  };
};
