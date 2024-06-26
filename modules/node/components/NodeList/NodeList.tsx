import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';
import isEqual from 'lodash/isEqual';
import {
  TableSkeleton,
  EmptyColumn,
  PageTitle,
  PageTitleLabel,
  Table,
  TableGrid,
} from '@shared/components';
import { debounce, ROUTES, useViewport } from '@shared/index';
import {} from './NodeListHeader/NodeListHeader';
import {
  NodeFilters,
  NodeListHeader,
  resultsStatus,
  mapNodeListToGrid,
  mapNodeListToRows,
  useNodeList,
  nodeAtoms,
  nodeSelectors,
} from '@modules/node';
import { layoutSelectors } from '@modules/layout';
import { wrapper } from 'styles/wrapper.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './nodeList.styles';
import IconNode from '@public/assets/icons/app/Node.svg';

export const NodeList = () => {
  const router = useRouter();

  const queryParams = useRecoilValue(nodeSelectors.queryParams);
  const setPagination = useSetRecoilState(nodeAtoms.nodeListPagination);

  const currentQueryParams = useRef(queryParams);

  const { loadNodes, nodeList, nodeCount, isLoading } = useNodeList();
  const { isXlrg } = useViewport();

  const activeView = useRecoilValue(layoutSelectors.activeNodeView(isXlrg));

  const loadNodesDebounced = debounce(loadNodes, 70);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, queryParams)) {
      currentQueryParams.current = queryParams;
      loadNodesDebounced();
    }
  }, [queryParams]);

  const handleNodeClicked = (nodeId: string) => {
    router.push(ROUTES.NODE(nodeId));
  };

  const loadMore = () => {
    setPagination((oldPagi) => ({
      ...oldPagi,
      currentPage: oldPagi.currentPage + 1,
    }));
  };

  const cells = mapNodeListToGrid(nodeList!, handleNodeClicked);
  const { headers, rows } = mapNodeListToRows(nodeList);

  const { isFiltered, isEmpty } = resultsStatus(
    nodeList?.length!,
    queryParams.filter,
  );

  const hasMore =
    nodeCount !== nodeList?.length &&
    queryParams.pagination?.currentPage * queryParams.pagination?.itemsPerPage +
      queryParams.pagination?.itemsPerPage <
      nodeCount;

  return (
    <>
      <PageTitle
        title="Nodes"
        icon={<IconNode />}
        label={
          <PageTitleLabel
            isLoading={isLoading !== 'finished'}
            isSuccess={nodeCount > 0}
            label={`${nodeCount}`}
          />
        }
      />

      <div css={[styles.wrapper, wrapper.main]}>
        <NodeFilters />
        <div css={styles.nodeListWrapper}>
          {!isXlrg && <NodeListHeader />}

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
              next={loadMore}
              hasMore={hasMore}
              style={{ overflow: 'hidden' }}
              scrollThreshold={0.75}
              loader={''}
            >
              {activeView === 'table' ? (
                <Table
                  isLoading={isLoading}
                  headers={headers}
                  preload={0}
                  rows={rows}
                  fixedRowHeight="120px"
                  queryParams={queryParams}
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
