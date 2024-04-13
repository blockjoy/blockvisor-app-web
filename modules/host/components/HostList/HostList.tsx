import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isEqual from 'lodash/isEqual';
import {
  TableSkeleton,
  EmptyColumn,
  Table,
  TableGrid,
  withQuery,
} from '@shared/components';
import { styles } from './HostList.styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { spacing } from 'styles/utils.spacing.styles';
import {
  hostAtoms,
  HostFilters,
  HostListHeader,
  mapHostListToGird,
  mapHostListToRows,
  resultsStatus,
  useHostList,
  useHostUIContext,
} from '@modules/host';

export const HostList = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      queryParams: hostUIContext.queryParams,
      setQueryParams: hostUIContext.setQueryParams,
    };
  }, [hostUIContext]);

  const [hostSort, setHostSort] = useRecoilState(hostAtoms.hostSort);

  const { loadHosts, hostList, hostCount, isLoading, handleHostClick } =
    useHostList();

  const activeView = useRecoilValue(hostAtoms.activeView);

  const currentQueryParams = useRef(hostUIProps.queryParams);

  const hasMore =
    hostCount !== hostList.length &&
    hostUIContext.queryParams.pagination.currentPage *
      hostUIContext.queryParams.pagination.itemsPerPage +
      hostUIContext.queryParams.pagination.itemsPerPage <
      hostCount;

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, hostUIProps.queryParams)) {
      loadHosts(hostUIProps.queryParams, !hostList?.length);
      currentQueryParams.current = hostUIProps.queryParams;
    }
  }, [hostUIProps.queryParams]);

  useEffect(() => {
    if (!isEqual(hostUIProps.queryParams.sort, hostSort))
      setHostSort(hostUIProps.queryParams.sort);
  }, [hostUIProps.queryParams.sort]);

  const updateQueryParams = async () => {
    const newCurrentPage = hostUIProps.queryParams.pagination.currentPage + 1;
    const newQueryParams = {
      ...hostUIProps.queryParams,

      pagination: {
        ...hostUIProps.queryParams.pagination,
        currentPage: newCurrentPage,
      },
    };

    hostUIProps.setQueryParams(newQueryParams);
  };

  const cells = mapHostListToGird(hostList, handleHostClick);

  const { headers, rows } = mapHostListToRows(hostList);

  const { isFiltered, isEmpty } = resultsStatus(
    hostList.length,
    hostUIProps.queryParams.filter,
  );

  const HostListTable = withQuery({ sort: true })(Table);

  return (
    <>
      <div css={styles.wrapper}>
        <HostFilters />
        <div css={styles.listWrapper}>
          <HostListHeader />
          {isLoading === 'initializing' ? (
            <TableSkeleton />
          ) : !Boolean(hostList?.length) && isLoading === 'finished' ? (
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
              next={updateQueryParams}
              hasMore={hasMore}
              style={{ overflow: 'hidden' }}
              scrollThreshold={0.75}
              loader={''}
            >
              {activeView === 'table' ? (
                <HostListTable
                  isLoading={isLoading}
                  headers={headers}
                  rows={rows}
                  onRowClick={handleHostClick}
                  queryParams={hostUIProps.queryParams}
                  setQueryParams={hostUIProps.setQueryParams}
                />
              ) : (
                <div css={styles.gridWrapper}>
                  <TableGrid
                    isLoading={isLoading}
                    cells={cells!}
                    entityName="hosts"
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
