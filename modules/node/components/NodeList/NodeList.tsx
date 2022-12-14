import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { hostsAtoms } from '@modules/hosts/store/hostAtoms';
import { PageTitle, TableGrid } from '@shared/components';
import { toRows, toGrid } from '@modules/node/utils';
import { NodeFilters } from './NodeFilters/NodeFilters';
import anime from 'animejs';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';
import { useModal } from '@shared/index';
import { GridCell } from '@shared/components/TableGrid/types/GridCell';
import { NodeListPageHeader } from './NodeListPageHeader/NodeListPageHeader';
import { InView } from 'react-intersection-observer';
import { LazyNodesTable } from '@modules/node';

const NUM_OF_ITEMS = 50;

export const NodeList = () => {
  const { loadNodes, handleNodeClick, loadNodesPaginated } = useNodeList();
  const { openModal } = useModal();

  const nodeList = useRecoilValue(nodeAtoms.nodeList);
  const [currentPage, setCurrentPage] = useState(0);
  const initialRender = useRef(true);

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
    if (type === 'table') {
      const rows = toRows(nodeList);
      setNodeRows(rows!);
      setNodeCells(undefined);
    } else {
      const cells = toGrid(nodeList, handleNodeClick);
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
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (currentPage > 1) {
        loadNodesPaginated({
          pagination: {
            current_page: currentPage,
            items_per_page: NUM_OF_ITEMS,
          },
        });
      }
    }
  }, [currentPage]);

  useEffect(() => {
    buildNodeList(activeListType);
  }, [nodeList?.length]);

  /* const handleIntersectionChange = async (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) => {
    const { isIntersecting, intersectionRatio } = entry;
    if (isIntersecting && intersectionRatio > 0.02) {
      setCurrentPage((prev) => prev + 1);
    }
  }; */

  return (
    <>
      <PageTitle title="Nodes" actionOnClick={openModal} actionText="Add Node">
        <NodeListPageHeader
          activeListType={activeListType}
          onTypeChanged={handleListTypeChanged}
        />
      </PageTitle>
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
            <LazyNodesTable
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
              <TableGrid
                numberOfItems={NUM_OF_ITEMS}
                isLoading={loading}
                cells={nodeCells!}
              />
            </div>
          )}
          {/* <InView initialInView={false} onChange={handleIntersectionChange}>
            <div style={{ height: '20px' }} id="js-intersection-trigger" />
          </InView> */}
        </div>
      </div>
    </>
  );
};
