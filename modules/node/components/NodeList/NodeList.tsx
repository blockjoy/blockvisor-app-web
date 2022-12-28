import { useEffect, useState, useMemo } from 'react';
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
import { Button, useModal } from '@shared/index';
import { GridCell } from '@shared/components/TableGrid/types/GridCell';
import { NodeListPageHeader } from './NodeListPageHeader/NodeListPageHeader';
import { useNodeUIContext } from '../../ui/NodeUIContext';
import InfiniteScroll from 'react-infinite-scroll-component';

export const NodeList = () => {
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const nodeList = useRecoilValue(nodeAtoms.nodeList);
  const hasMoreNodes = useRecoilValue(nodeAtoms.hasMoreNodes);

  const { loadNodes, handleNodeClick } = useNodeList();

  const { openModal } = useModal();

  const [nodeRows, setNodeRows] = useState<Row[]>();
  const [nodeCells, setNodeCells] = useState<GridCell[]>();

  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );
  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const hasHosts = !!useRecoilValue(hostsAtoms.hosts)?.length;

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
    loadNodes(nodeUIProps.queryParams);
  }, [nodeUIProps.queryParams]);

  useEffect(() => {
    buildNodeList(activeListType);
  }, [nodeList]);
  
  useEffect(() => {
    buildNodeList(activeListType);
  }, [activeListType]);

  useEffect(() => {
    animateEntry();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQueryParams = () => {
    const newCurrentPage = nodeUIProps.queryParams.pagination.current_page + 1;
    const newQueryParams = {
      ...nodeUIProps.queryParams,

      pagination: {
        ...nodeUIProps.queryParams.pagination,
        current_page: newCurrentPage,
      }
    };
    
    nodeUIProps.setQueryParams(newQueryParams);
  }

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
        <NodeFilters />
        <div css={styles.nodeListWrapper}>
          <NodeListHeader
            totalRows={nodeRows?.length || nodeCells?.length || 0}
            activeListType={activeListType}
            onTypeChanged={handleListTypeChanged}
          />
          <InfiniteScroll
            dataLength={nodeList.length}
            next={updateQueryParams}
            hasMore={hasMoreNodes}
            style={{ overflow: 'hidden' }}
            scrollThreshold={0.7}
            loader={isLoading === 'finished' && <div css={styles.loader}><Button size="small" onClick={updateQueryParams} style="outline">Show More</Button></div>}
            endMessage={isLoading !== 'initializing' && <div css={styles.endMessage}>- No more nodes -</div>}
          >
            {activeListType === 'table' ? (
              <Table
                isLoading={isLoading}
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
                  <TableGrid isLoading={isLoading} cells={nodeCells!} />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
