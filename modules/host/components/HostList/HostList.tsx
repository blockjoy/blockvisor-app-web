import { useEffect, useMemo, useRef } from 'react';
import { isEqual } from 'lodash';
import { useRecoilValue } from 'recoil';
import {
  TableSkeleton,
  EmptyColumn,
  PageTitle,
  Table,
  TableGrid,
} from '@shared/components';
import { styles } from './HostList.styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { wrapper } from 'styles/wrapper.styles';
import { spacing } from 'styles/utils.spacing.styles';
import {
  hostAtoms,
  HostFilters,
  HostLauncher,
  HostListHeader,
  mapHostListToGird,
  mapHostListToRows,
  resultsStatus,
  useHostList,
  useHostUIContext,
} from '@modules/host';
import {
  useDefaultOrganization,
  useProvisionToken,
} from '@modules/organization';
import IconHost from '@public/assets/icons/app/Host.svg';

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
  const { provisionToken, getProvisionToken } = useProvisionToken();
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

  useEffect(() => {
    getProvisionToken(defaultOrganization?.id!);
  }, []);

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
      <PageTitle title="Hosts" icon={<IconHost />} />
      <div css={[styles.wrapper, wrapper.main]}>
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
                    <a css={styles.launchNodeLink} onClick={() => {}}>
                      Create a host
                    </a>
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
        <div css={styles.rightPanel}>
          <HostLauncher token={provisionToken} />
        </div>
      </div>
    </>
  );
};
