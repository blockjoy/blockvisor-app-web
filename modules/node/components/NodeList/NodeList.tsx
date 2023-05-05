import { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { isEqual } from 'lodash';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { EmptyColumn, PageTitle, Table, TableGrid } from '@shared/components';
import { toGrid } from '@modules/node/utils';
import { NodeFilters } from './NodeFilters/NodeFilters';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';
import { TableSkeleton } from '@shared/index';
import { useNodeUIContext } from '../../ui/NodeUIContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { resultsStatus } from '@modules/node/utils';
import { wrapper } from 'styles/wrapper.styles';
import { useRouter } from 'next/router';
import { spacing } from 'styles/utils.spacing.styles';
import { mapNodeListToRows } from '@modules/node/utils/mapNodeListToRows';
import { organizationAtoms } from '@modules/organization';

export const NodeList = () => {
  const router = useRouter();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const { loadNodes, handleNodeClick } = useNodeList();

  const nodeList = useRecoilValue(nodeAtoms.nodeList);
  const hasMoreNodes = useRecoilValue(nodeAtoms.hasMoreNodes);
  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const preloadNodes = useRecoilValue(nodeAtoms.preloadNodes);
  const activeListType = useRecoilValue(nodeAtoms.activeListType);

  const currentQueryParams = useRef(nodeUIProps.queryParams);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, nodeUIProps.queryParams)) {
      loadNodes(nodeUIProps.queryParams);
      currentQueryParams.current = nodeUIProps.queryParams;
    }
  }, [nodeUIProps.queryParams]);

  // useEffect(() => {
  //   loadNodes();
  //   console.log('hmmm', defaultOrganization?.id);
  // }, [defaultOrganization]);

  const updateQueryParams = async () => {
    // sleep 300ms for better UX/UI (maybe should be removed)
    await new Promise((r) => setTimeout(r, 300));

    const newCurrentPage = nodeUIProps.queryParams.pagination.current_page + 1;
    const newQueryParams = {
      ...nodeUIProps.queryParams,

      pagination: {
        ...nodeUIProps.queryParams.pagination,
        current_page: newCurrentPage,
      },
    };

    nodeUIProps.setQueryParams(newQueryParams);
  };

  const cells = toGrid(nodeList, handleNodeClick);
  const { headers, rows } = mapNodeListToRows(nodeList);
  const { isFiltered, isEmpty } = resultsStatus(
    nodeList.length,
    nodeUIProps.queryParams.filter,
  );

  return (
    <>
      <PageTitle hasOrgPicker title="Nodes" />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeFilters isLoading={isLoading} />
        <div css={styles.nodeListWrapper}>
          <NodeListHeader />
          {isLoading === 'initializing' ? (
            <TableSkeleton dataCy="nodeList-skeleton" />
          ) : !Boolean(nodeList?.length) && isLoading === 'finished' ? (
            <EmptyColumn
              title="No Nodes."
              dataCy="nodeList-emptyColumn"
              description={
                isFiltered && isEmpty ? (
                  'Reset filters.'
                ) : (
                  <div>
                    <h3 css={spacing.bottom.mediumSmall}>
                      Here is where your nodes will show, once you have some.
                    </h3>
                    <a
                      css={styles.launchNodeLink}
                      onClick={() => router.push('/launch-node')}
                    >
                      Launch a node to get started
                    </a>
                  </div>
                )
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
                  headers={headers}
                  preload={preloadNodes}
                  rows={rows}
                  fixedRowHeight="140px"
                  onRowClick={handleNodeClick}
                  tableDataCy="nodeList-tableView"
                />
              ) : (
                <div css={styles.gridWrapper}>
                  <TableGrid
                    isLoading={isLoading}
                    cells={cells!}
                    preload={preloadNodes}
                    dataCy="nodeList-gridView"
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
