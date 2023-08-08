import { useEffect, useMemo, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useRecoilValue } from 'recoil';
import {
  TableSkeleton,
  EmptyColumn,
  Table,
  TableGrid,
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
import { useDefaultOrganization } from '@modules/organization';

export const HostList = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      queryParams: hostUIContext.queryParams,
      setQueryParams: hostUIContext.setQueryParams,
    };
  }, [hostUIContext]);

  const { loadHosts, hostList, hostListSorted, isLoading, handleHostClick } =
    useHostList();

  const { defaultOrganization } = useDefaultOrganization();
  const hasMoreHosts = useRecoilValue(hostAtoms.hasMoreHosts);
  const preloadHosts = useRecoilValue(hostAtoms.preloadHosts);
  const activeListType = useRecoilValue(hostAtoms.activeListType);

  const currentQueryParams = useRef(hostUIProps.queryParams);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, hostUIProps.queryParams)) {
      loadHosts(hostUIProps.queryParams);
      currentQueryParams.current = hostUIProps.queryParams;
    }
  }, [hostUIProps.queryParams]);

  const updateQueryParams = async () => {
    // sleep 300ms for better UX/UI (maybe should be removed)
    await new Promise((r) => setTimeout(r, 300));

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

  const cells = mapHostListToGird(hostListSorted, handleHostClick);

  const { headers, rows } = mapHostListToRows(hostListSorted);

  const { isFiltered, isEmpty } = resultsStatus(
    hostListSorted.length,
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
              hasMore={hasMoreHosts}
              style={{ overflow: 'hidden' }}
              scrollThreshold={1}
              loader={''}
              endMessage={''}
            >
              {activeListType === 'table' ? (
                <Table
                  isLoading={isLoading}
                  headers={headers}
                  rows={rows}
                  onRowClick={handleHostClick}
                  preload={preloadHosts}
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
