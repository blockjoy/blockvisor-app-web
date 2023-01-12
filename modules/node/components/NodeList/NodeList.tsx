import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import {
  EmptyColumn,
  PageTitle,
  Table,
  TableGrid,
} from '@shared/components';
import { toRows, toGrid } from '@modules/node/utils';
import { NodeFilters } from './NodeFilters/NodeFilters';
import anime from 'animejs';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';
import { TableSkeleton, useModal } from '@shared/index';
import { NodeListPageHeader } from './NodeListPageHeader/NodeListPageHeader';
import { useNodeUIContext } from '../../ui/NodeUIContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { resultsStatus } from '@modules/node/helpers/NodeHelpers';
import { organizationAtoms } from '@modules/organization';
import { initialQueryParams } from '@modules/node/ui/NodeUIHelpers';

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

  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );
  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const preloadNodes = useRecoilValue(nodeAtoms.preloadNodes);

  const defaultOrganization = useRecoilValue(organizationAtoms.defaultOrganization);
  const currentOrganization = useRef(defaultOrganization);

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

  useEffect(() => {
    window.scrollTo(0, 0);
    animateEntry();
  }, []);

  useEffect(() => {
    loadNodes(nodeUIProps.queryParams);
  }, [nodeUIProps.queryParams]);

  useEffect(() => {
    if (currentOrganization.current?.id !== defaultOrganization?.id) {
      // TODO: remove/move reloadQueryParams to avoid double-render
      reloadQueryParams();
      loadNodes(initialQueryParams);

      currentOrganization.current = defaultOrganization; 
    }
  }, [defaultOrganization?.id]);

  const updateQueryParams = async () => {
    // sleep 300ms for better UX/UI (maybe should be removed)
    await new Promise(r => setTimeout(r, 300));

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

  const reloadQueryParams = async () => {
    nodeUIProps.setQueryParams(initialQueryParams);
  }

  const cells = toGrid(nodeList, handleNodeClick);
  const rows = toRows(nodeList);
  const { isFiltered, isEmpty } = resultsStatus(nodeList.length, nodeUIProps.queryParams.filter);

  return (
    <>
      <PageTitle title="Nodes" actionOnClick={openModal} actionText="Add Node">
        <NodeListPageHeader
          activeListType={activeListType}
          onTypeChanged={handleListTypeChanged}
        />
      </PageTitle>
      <div css={styles.wrapper}>
        <NodeFilters />
        <div css={styles.nodeListWrapper}>
          <NodeListHeader
            totalRows={nodeList?.length || 0}
            activeListType={activeListType}
            onTypeChanged={handleListTypeChanged}
          />
          {isLoading === 'initializing' ? (
            <TableSkeleton />
          ) : !Boolean(nodeList?.length) && isLoading === 'finished' ? (
            <EmptyColumn
              id="js-nodes-empty"
              title="No Nodes."
              description={
                isFiltered && isEmpty
                  ? 'Reset filters.'
                  : 'Add your nodes and hosts to get started with BlockVisor'
              }
            />
          ) : (
            <InfiniteScroll
              dataLength={nodeList.length}
              next={updateQueryParams}
              hasMore={hasMoreNodes}
              style={{ overflow: 'hidden' }}
              scrollThreshold={1}
              loader={''}
              endMessage={''}
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
                  preload={preloadNodes}
                  rows={rows}
                  onRowClick={handleNodeClick}
                />
              ) : (
                <div css={styles.gridWrapper}>
                  <TableGrid
                    isLoading={isLoading}
                    cells={cells!}
                    preload={preloadNodes}
                  />
                </div>
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
