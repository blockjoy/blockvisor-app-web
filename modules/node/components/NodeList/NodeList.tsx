import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';
import isEqual from 'lodash/isEqual';
import {
  TableSkeleton,
  EmptyColumn,
  PageTitle,
  Table,
  TableGrid,
} from '@shared/components';
import { NodeFilters } from './NodeFilters/NodeFilters';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';
import {
  resultsStatus,
  mapNodeListToGrid,
  mapNodeListToRows,
  useNodeList,
  useNodeUIContext,
} from '@modules/node';
import { wrapper } from 'styles/wrapper.styles';
import { spacing } from 'styles/utils.spacing.styles';
import IconNode from '@public/assets/icons/app/Node.svg';
import { ROUTES } from '@shared/index';
import { layoutSelectors } from '@modules/layout';

export const NodeList = () => {
  const router = useRouter();

  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const [nodeSort, setNodeSort] = useRecoilState(nodeAtoms.nodeSort);

  const { loadNodes, nodeList, nodeCount, isLoading } = useNodeList();

  const handleNodeClicked = (nodeId: string) => {
    nodeUIProps.setQueryParams({
      ...nodeUIProps.queryParams,
      pagination: {
        ...nodeUIProps.queryParams.pagination,
      },
    });

    router.push(ROUTES.NODE(nodeId));
  };

  const hasMoreNodes =
    nodeCount !== nodeList?.length &&
    nodeUIContext.queryParams.pagination.currentPage *
      nodeUIContext.queryParams.pagination.itemsPerPage +
      nodeUIContext.queryParams.pagination.itemsPerPage <
      nodeCount;

  const view = useRecoilValue(layoutSelectors.nodeView);

  const currentQueryParams = useRef(nodeUIProps.queryParams);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, nodeUIProps.queryParams)) {
      loadNodes(nodeUIProps.queryParams, !nodeList?.length);
      currentQueryParams.current = nodeUIProps.queryParams;
    }
  }, [nodeUIProps.queryParams]);

  useEffect(() => {
    if (!isEqual(nodeUIProps.queryParams.sort, nodeSort))
      setNodeSort(nodeUIProps.queryParams.sort);
  }, [nodeUIProps.queryParams.sort]);

  const updateQueryParams = () => {
    const newCurrentPage = nodeUIProps.queryParams.pagination.currentPage + 1;
    const newQueryParams = {
      ...nodeUIProps.queryParams,

      pagination: {
        ...nodeUIProps.queryParams.pagination,
        currentPage: newCurrentPage,
        scrollPosition: window.scrollY,
      },
    };

    nodeUIProps.setQueryParams(newQueryParams);
  };

  const cells = mapNodeListToGrid(nodeList!, handleNodeClicked);

  const { headers, rows } = mapNodeListToRows(nodeList);

  const { isFiltered, isEmpty } = resultsStatus(
    nodeList?.length!,
    nodeUIProps.queryParams.filter,
  );

  return (
    <>
      <PageTitle title="Nodes" icon={<IconNode />} />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeFilters />
        <div css={styles.nodeListWrapper}>
          <NodeListHeader />
          {isLoading === 'initializing' ? (
            <TableSkeleton />
          ) : !Boolean(nodeList?.length) && isLoading === 'finished' ? (
            <EmptyColumn
              title="No Nodes."
              description={
                isFiltered && isEmpty ? (
                  'Reset filters.'
                ) : (
                  <div>
                    <h3 css={spacing.bottom.mediumSmall}>
                      Here is where your nodes will show, once you have some.
                    </h3>
                    <a onClick={() => router.push('/launch-node')}>
                      Launch a node to get started
                    </a>
                  </div>
                )
              }
            />
          ) : (
            <InfiniteScroll
              dataLength={nodeList?.length!}
              next={updateQueryParams}
              hasMore={hasMoreNodes}
              style={{ overflow: 'hidden' }}
              scrollThreshold={0.75}
              loader={''}
            >
              {view === 'table' ? (
                <Table
                  isLoading={isLoading}
                  headers={headers}
                  preload={0}
                  rows={rows}
                  fixedRowHeight="120px"
                  onRowClick={handleNodeClicked}
                />
              ) : (
                <div css={styles.gridWrapper}>
                  <TableGrid isLoading={isLoading} cells={cells!} />
                </div>
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
