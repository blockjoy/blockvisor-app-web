import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import isEqual from 'lodash/isEqual';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TableSkeleton,
  EmptyColumn,
  Table,
  TableGrid,
} from '@shared/components';
import { useViewport } from '@shared/index';
import {
  hostAtoms,
  HostFilters,
  HostListHeader,
  hostSelectors,
  mapHostListToGird,
  mapHostListToRows,
  resultsStatus,
  useHostList,
} from '@modules/host';
import { layoutSelectors } from '@modules/layout';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './HostList.styles';

export const HostList = () => {
  const queryParams = useRecoilValue(hostSelectors.queryParams);
  const setPagination = useSetRecoilState(hostAtoms.hostListPagination);

  const currentQueryParams = useRef(queryParams);

  const {
    loadHosts,
    hostList,
    hostCount,
    hostListLoadingState,
    handleHostClick,
  } = useHostList();
  const { isXlrg } = useViewport();

  const activeView = useRecoilValue(layoutSelectors.activeHostView(isXlrg));

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, queryParams)) {
      loadHosts();
      currentQueryParams.current = queryParams;
    }
  }, [queryParams]);

  const loadMore = async () => {
    setPagination((oldPagi) => ({
      ...oldPagi,
      currentPage: oldPagi.currentPage + 1,
    }));
  };

  const cells = mapHostListToGird(hostList, handleHostClick);
  const { headers, rows } = mapHostListToRows(hostList);

  const { isFiltered, isEmpty } = resultsStatus(
    hostList.length,
    queryParams.filter,
  );

  const hasMore =
    hostCount !== hostList.length &&
    queryParams.pagination.currentPage * queryParams.pagination.itemsPerPage +
      queryParams.pagination.itemsPerPage <
      hostCount;

  return (
    <div css={styles.wrapper}>
      <HostFilters />

      <div css={styles.listWrapper}>
        {!isXlrg && <HostListHeader />}

        {hostListLoadingState === 'initializing' ? (
          <TableSkeleton />
        ) : !Boolean(hostList?.length) ? (
          <EmptyColumn
            title="No Hosts."
            description={
              isFiltered && isEmpty ? (
                'Nothing to see here.'
              ) : (
                <div>
                  <h3 css={spacing.bottom.mediumSmall}>
                    Here is where your hosts will show, once you have some.
                  </h3>
                </div>
              )
            }
          />
        ) : (
          <InfiniteScroll
            dataLength={hostList.length}
            next={loadMore}
            hasMore={hasMore}
            style={{ overflow: 'hidden' }}
            scrollThreshold={0.75}
            loader={''}
          >
            {activeView === 'table' ? (
              <Table
                isLoading={hostListLoadingState}
                headers={headers}
                rows={rows}
                queryParams={queryParams}
                onRowClick={handleHostClick}
              />
            ) : (
              <div css={styles.gridWrapper}>
                <TableGrid
                  isLoading={hostListLoadingState}
                  cells={cells!}
                  entityName="hosts"
                />
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
