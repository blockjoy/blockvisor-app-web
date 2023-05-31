import { useEffect, useMemo, useRef } from 'react';
import { isEqual } from 'lodash';
import { useRecoilValue } from 'recoil';
import { EmptyColumn, PageTitle, Table, TableGrid } from '@shared/components';
import { styles } from './HostList.styles';
import { TableSkeleton } from '@shared/index';
import { useHostUIContext } from '../../ui/HostUIContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { wrapper } from 'styles/wrapper.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { NodeTitle } from '@modules/node';
import {
  hostAtoms,
  HostLauncher,
  HostListHeader,
  mapHostListToGird,
  mapHostListToRows,
  useHostList,
} from '@modules/host';
import IconUnion from '@public/assets/icons/union-16.svg';
import { HostFilters } from './HostFilters/HostFilters';
import { resultsStatus } from '@modules/host/utils/resultsStatus';
import { useProvisionToken } from '@modules/organization/hooks/useProvisionToken';

export const HostList = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      queryParams: hostUIContext.queryParams,
      setQueryParams: hostUIContext.setQueryParams,
    };
  }, [hostUIContext]);

  const { loadHosts, hostList, isLoading, handleHostClick } = useHostList();
  const { provisionToken, provisionTokenLoadingState, getProvisionToken } =
    useProvisionToken();
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
    getProvisionToken();
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

  const cells = mapHostListToGird(hostList, handleHostClick);
  const { headers, rows } = mapHostListToRows(hostList);

  const { isFiltered, isEmpty } = resultsStatus(
    hostList.length,
    hostUIProps.queryParams.filter,
  );

  return (
    <>
      <PageTitle>
        <NodeTitle icon={<IconUnion />} titleText="Hosts" />
      </PageTitle>
      <div css={[styles.wrapper, wrapper.main]}>
        <HostFilters isLoading={isLoading} />
        <div css={styles.listWrapper}>
          <HostListHeader />

          {isLoading === 'initializing' ? (
            <TableSkeleton />
          ) : !Boolean(hostList?.length) && isLoading === 'finished' ? (
            <EmptyColumn
              title="No Hosts."
              description={
                isFiltered && isEmpty ? (
                  'Reset filters.'
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
                  fixedRowHeight="120px"
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
        <div css={styles.quickEdit}>
          {provisionTokenLoadingState === 'initializing' ? (
            <TableSkeleton />
          ) : (
            <HostLauncher token={provisionToken} />
          )}
        </div>
      </div>
    </>
  );
};
