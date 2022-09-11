import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { layoutState } from '@modules/layout/store';
import { PageHeader, PageSection, Table } from '../shared';
import { useEffect, useState } from 'react';
import { Button } from '@shared/components';
import { Header, Row } from '../shared/table/Table';
import { NodesSortButton } from './NodesSortButton';
import { TableBlockNodes } from '@modules/app/components/shared';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { HostStatus } from '../host/HostStatus';

export type Node = {
  name: string;
  id: string;
  address: string;
  added: string;
  status: string;
};

type State = {
  rows: Row[];
  headers?: Header[];
};

export default () => {
  const [state, setState] = useState<State>({
    rows: [],
    headers: [],
  });
  const [layout, setLayout] = useRecoilState(layoutState);
  const [app, setApp] = useRecoilState(appState);

  const { rows } = state;
  const { grpcClient, nodes, nodesSortExpression, nodesLoading, nodesSorting } =
    app;

  const handleSort = (nodesSortExpression: string) => {
    setApp({
      ...app,
      nodesSortExpression,
      nodesSorting: true,
    });
    setTimeout(() => {
      setApp({
        ...app,
        nodesSortExpression,
        nodesSorting: false,
      });
    }, 600);
  };

  const handleAddNode = () => {
    setLayout({
      ...layout,
      isNodeAddOpen: true,
    });
  };

  const headers = [
    {
      name: 'Name',
      component: (
        <NodesSortButton
          handleSort={handleSort}
          nodesSortExpression={nodesSortExpression}
        >
          name
        </NodesSortButton>
      ),
      width: '100px',
      key: '1',
    },
    {
      name: 'Added',
      isHiddenOnMobile: true,
      component: (
        <NodesSortButton
          handleSort={handleSort}
          nodesSortExpression={nodesSortExpression}
        >
          added
        </NodesSortButton>
      ),
      width: '100px',
      key: '2',
    },
    {
      name: 'Status',
      component: (
        <NodesSortButton
          handleSort={handleSort}
          nodesSortExpression={nodesSortExpression}
        >
          {' '}
          status
        </NodesSortButton>
      ),
      width: '100px',
      key: '3',
    },
  ];

  const loadNodes = async () => {
    setApp({
      ...app,
      nodesLoading: true,
    });
    const hostId = new Uuid();
    hostId.setValue('34234234234');
    const nodes: any = await grpcClient.getNode(hostId);

    console.log('nodes', nodes);

    setApp({
      ...app,
      nodes,
      nodesLoading: false,
    });
  };

  useEffect(() => {
    loadNodes();
  }, []);

  useEffect(() => {
    if (nodes?.length) {
      const rows = nodes.map((node: any) => ({
        key: node.id.value,
        cells: [
          {
            key: '1',
            component: (
              <>
                <TableBlockNodes
                  id={node.id}
                  name={node.name}
                  address={node.address}
                />
                <span>Added just now</span>
              </>
            ),
          },
          {
            key: '2',
            component: <span>Added just now</span>,
          },
          {
            key: '3',
            component: <HostStatus status={node.status} />,
          },
        ],
      }));

      setState({
        rows,
      });
    }
  }, [nodes?.length]);

  return (
    <PageSection>
      <PageHeader>
        Organization Management
        <Button onClick={handleAddNode} size="small">
          Create New
        </Button>
      </PageHeader>
      <Table
        isSorting={nodesSorting}
        isLoading={nodesLoading}
        headers={headers}
        rows={rows}
        onRowClick={() => console.log('row clicked')}
      />
    </PageSection>
  );
};
