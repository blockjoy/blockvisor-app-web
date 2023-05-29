import { useEffect } from 'react';
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

export const HostList = () => {
  const nodeUIContext = useHostUIContext();
  const { loadHosts, hostList, isLoading, handleHostClick } = useHostList();

  const activeListType = useRecoilValue(hostAtoms.activeListType);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadHosts();
  }, []);

  const cells = mapHostListToGird(hostList, handleHostClick);
  const { headers, rows } = mapHostListToRows(hostList);

  return (
    <>
      <PageTitle>
        <NodeTitle icon={<IconUnion />} titleText="Hosts" />
      </PageTitle>
      <div css={[styles.wrapper, wrapper.main]}>
        <div css={styles.listWrapper}>
          <HostListHeader />

          {isLoading === 'initializing' ? (
            <TableSkeleton />
          ) : !Boolean(hostList?.length) && isLoading === 'finished' ? (
            <EmptyColumn
              title="No Hosts."
              description={
                <div>
                  <h3 css={spacing.bottom.mediumSmall}>
                    Here is where your hosts will show, once you have some.
                  </h3>
                  <a css={styles.launchNodeLink} onClick={() => {}}>
                    Create a host
                  </a>
                </div>
              }
            />
          ) : (
            <InfiniteScroll
              dataLength={hostList.length}
              next={() => {}}
              hasMore={false}
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
          <HostLauncher />
        </div>
      </div>
    </>
  );
};
