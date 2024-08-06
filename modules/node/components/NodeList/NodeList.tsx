import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';
import isEqual from 'lodash/isEqual';
import { css, Global } from '@emotion/react';
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
  useNodeSort,
} from '@modules/node';
import { layoutSelectors } from '@modules/layout';
import { wrapper } from 'styles/wrapper.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './nodeList.styles';
import { breakpoints } from 'styles/variables.styles';
import IconNode from '@public/assets/icons/app/Node.svg';

export const NodeList = () => {
  const router = useRouter();

  const queryParams = useRecoilValue(nodeSelectors.queryParams);
  const setPagination = useSetRecoilState(nodeAtoms.nodeListPagination);

  const nodeListWrapperRef = useRef<HTMLDivElement>(null);
  const currentQueryParams = useRef(queryParams);

  const { loadNodes, nodeList, nodeCount, nodeListLoadingState } =
    useNodeList();
  const { updateSorting } = useNodeSort();
  const { isXlrg } = useViewport();

  const activeView = useRecoilValue(layoutSelectors.activeNodeView(isXlrg));

  const [isOverflow, setIsOverflow] = useState(false);

  const loadNodesDebounced = debounce(loadNodes, 70);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, queryParams)) {
      currentQueryParams.current = queryParams;
      loadNodesDebounced();
    }
  }, [queryParams]);

  const handleResize = () => {
    if (nodeListWrapperRef.current) {
      const height = nodeListWrapperRef.current.offsetHeight;
      setIsOverflow(height > window.innerHeight - 72);
    }
  };

  useLayoutEffect(() => {
    const observer = new ResizeObserver(handleResize);

    if (nodeListWrapperRef.current) {
      observer.observe(nodeListWrapperRef.current);
    }

    handleResize();

    return () => {
      if (nodeListWrapperRef.current) {
        observer.unobserve(nodeListWrapperRef.current);
      }
    };
  }, []);

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
      {!isOverflow ? (
        <Global
          styles={css`
            body {
              @media ${breakpoints.fromXLrg} {
                overflow: hidden;
              }
            }
          `}
        />
      ) : null}

      <PageTitle
        title="Nodes"
        icon={<IconNode />}
        label={
          <PageTitleLabel
            isLoading={nodeListLoadingState !== 'finished'}
            isSuccess={nodeCount > 0}
            label={`${nodeCount}`}
          />
        }
      />

      <div css={[styles.wrapper, wrapper.main]}>
        <NodeFilters />
        <div css={styles.nodeListWrapper} ref={nodeListWrapperRef}>
          {!isXlrg && <NodeListHeader />}

          {nodeListLoadingState === 'initializing' ? (
            <TableSkeleton />
          ) : !Boolean(nodeList?.length) ? (
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
                  isLoading={nodeListLoadingState}
                  headers={headers}
                  preload={0}
                  rows={rows}
                  fixedRowHeight="120px"
                  queryParams={queryParams}
                  handleSort={updateSorting}
                  onRowClick={handleNodeClicked}
                />
              ) : (
                <div css={styles.gridWrapper}>
                  <TableGrid isLoading={nodeListLoadingState} cells={cells!} />
                </div>
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
