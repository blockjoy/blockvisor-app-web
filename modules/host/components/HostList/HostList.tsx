import { useEffect, useMemo, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useRecoilValue } from 'recoil';
import {
  TableSkeleton,
  EmptyColumn,
  Table,
  TableGrid,
  Alert,
} from '@shared/components';
import { styles } from './HostList.styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { spacing } from 'styles/utils.spacing.styles';
import {
  hostAtoms,
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

  const { loadHosts, hostList, hostCount, isLoading, handleHostClick } =
    useHostList();

  const activeListType = useRecoilValue(hostAtoms.activeListType);

  const currentQueryParams = useRef(hostUIProps.queryParams);

  const hasMore =
    hostCount !== hostList.length &&
    hostUIContext.queryParams.pagination.current_page *
      hostUIContext.queryParams.pagination.items_per_page +
      hostUIContext.queryParams.pagination.items_per_page <
      hostCount;

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, hostUIProps.queryParams)) {
      loadHosts(hostUIProps.queryParams);
      currentQueryParams.current = hostUIProps.queryParams;
    }
  }, [hostUIProps.queryParams]);

  const updateQueryParams = async () => {
    const newCurrentPage = hostUIProps.queryParams.pagination.current_page + 1;
    const newQueryParams = {
      ...hostUIProps.queryParams,

      pagination: {
        ...hostUIProps.queryParams.pagination,
        current_page: newCurrentPage,
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

  return (
    <>
      <div css={styles.wrapper}>
        {/* TODO: Implement filters in api */}
        {/* <HostFilters isLoading={isLoading} /> */}
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
              {activeListType === 'table' ? (
                <Table
                  isLoading={isLoading}
                  headers={headers}
                  rows={rows}
                  onRowClick={handleHostClick}
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
