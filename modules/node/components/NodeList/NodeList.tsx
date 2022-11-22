import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { hostsAtoms } from '@modules/hosts/store/hostAtoms';
import {
  EmptyColumn,
  PageSection,
  PageTitle,
  Table,
  TableGrid,
} from '@shared/components';
import { toRows, toGrid } from '@modules/node/utils';
import { NodeFilters } from './NodeFilters/NodeFilters';
import anime from 'animejs';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';
import { useModal } from '@shared/index';
import { GridCell } from '@shared/components/TableGrid/types/GridCell';

export const NodeList = () => {
  const { loadNodes, handleNodeClick } = useNodeList();
  const { openModal } = useModal();

  const nodeList = useRecoilValue(nodeAtoms.nodeList);

  const [nodeRows, setNodeRows] = useState<Row[]>();
  const [nodeCells, setNodeCells] = useState<GridCell[]>();

  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );
  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const hasHosts = !!useRecoilValue(hostsAtoms.hosts)?.length;
  const loading = isLoading === 'initializing' || isLoading === 'loading';
  const finished = isLoading === 'finished';

  const handleListTypeChanged = (type: string) => {
    setActiveListType(type);
  };

  const animateEntry = () =>
    anime({
      targets: `#js-nodes-empty`,
      opacity: [0, 1],
      translateY: [8, 0],
      easing: 'easeInOutQuad',
      duration: 400,
    });

  // useEffect(() => {
  //   setActiveListType('grid');
  // }, []);

  const buildNodeList = (type: string) => {
    console.log('nodeList', nodeList);
    if (type === 'table') {
      const rows = toRows(nodeList);
      setNodeRows(rows!);
      setNodeCells(undefined);
    } else {
      const cells = toGrid(nodeList, handleNodeClick);
      console.log('cells', cells);
      setNodeCells(cells!);
      setNodeRows(undefined);
    }
  };

  useEffect(() => {
    buildNodeList(activeListType);
  }, [activeListType]);

  useEffect(() => {
    animateEntry();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadNodes();
  }, []);

  useEffect(() => {
    buildNodeList(activeListType);
  }, [nodeList?.length]);

  return (
    <>
      <PageTitle
        title="All Nodes"
        actionOnClick={openModal}
        actionText="Add Node"
      ></PageTitle>
      <PageSection bottomBorder={false}>
        {/* {!Boolean(nodeRows?.length) &&
        !Boolean(nodeCells?.length) &&
        finished ? (
          <>
            <EmptyColumn
              id="js-nodes-empty"
              title="No Nodes."
              description="Add your nodes and hosts to get started with BlockVisor."
            />
          </>
        ) : ( */}
        <div css={styles.wrapper}>
          <NodeFilters loadNodes={loadNodes} />
          <div css={styles.nodeListWrapper}>
            <NodeListHeader
              totalRows={nodeRows?.length || nodeCells?.length || 0}
              activeListType={activeListType}
              onTypeChanged={handleListTypeChanged}
            />
            {activeListType === 'table' ? (
              <Table
                isLoading={loading}
                headers={[
                  {
                    name: '',
                    key: '1',
                    width: '30px',
                    minWidth: '30px',
                    maxWidth: '30px',
                  },
                  {
                    name: 'Name',
                    key: '2',
                    width: '300px',
                  },
                  {
                    name: 'Added',
                    key: '3',
                    width: '200px',
                  },
                  {
                    name: 'Status',
                    key: '4',
                    width: '200px',
                  },
                ]}
                rows={nodeRows || []}
                onRowClick={handleNodeClick}
              />
            ) : (
              <div css={styles.gridWrapper}>
                <TableGrid isLoading={loading} cells={nodeCells!} />
              </div>
            )}
          </div>
        </div>
        {/* )} */}
      </PageSection>
    </>
  );
};
