import { useEffect, useState } from 'react';
import { mapHostNodesToRows, useHostView } from '@modules/host';
import { useNodeList } from '@modules/node';
import {
  Alert,
  EmptyColumn,
  NextLink,
  Table,
  TableSkeleton,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { organizationSelectors } from '@modules/organization';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilValue } from 'recoil';
import { authSelectors } from '@modules/auth';

const itemsPerPage = 48;

export const HostViewNodes = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    nodeListByHost,
    nodeListLoadingState,
    listNodesByHost,
    nodeListByHostCount,
  } = useNodeList();
  const { isLoading: isLoadingActiveHost } = useHostView();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [pageIndex, setPageIndex] = useState(0);

  const hasMoreNodes =
    pageIndex * itemsPerPage + itemsPerPage < nodeListByHostCount;

  const handleNodeClicked = (id: string) => router.push(ROUTES.NODE(id));

  const { headers, rows } = mapHostNodesToRows(nodeListByHost!);

  useEffect(() => {
    if (router.isReady) {
      listNodesByHost(id as string, {
        currentPage: pageIndex,
        itemsPerPage: itemsPerPage,
      });
    }
  }, [pageIndex, router.isReady]);

  return (
    <>
      {!isSuperUser && (
        <Alert isSuccess>
          Showing nodes for{' '}
          <NextLink href={ROUTES.ORGANIZATION(defaultOrganization?.orgId!)}>
            {defaultOrganization?.name}
          </NextLink>{' '}
          organization.
        </Alert>
      )}

      {nodeListLoadingState !== 'finished' &&
      isLoadingActiveHost !== 'finished' ? (
        <TableSkeleton />
      ) : !Boolean(nodeListByHost?.length) ? (
        <EmptyColumn
          title="No Nodes."
          description={
            <div>
              <h3 css={spacing.bottom.mediumSmall}>
                Here is where your nodes will show, once you have some.
              </h3>
              <a onClick={() => router.push('/launch-node')}>
                Launch a node to get started
              </a>
            </div>
          }
        />
      ) : (
        <InfiniteScroll
          dataLength={nodeListByHost?.length!}
          next={() => setPageIndex(pageIndex + 1)}
          hasMore={hasMoreNodes}
          style={{ overflow: 'hidden' }}
          scrollThreshold={0.75}
          loader={''}
        >
          <Table
            hideHeader
            isLoading={nodeListLoadingState}
            headers={headers}
            rows={rows}
            fixedRowHeight="120px"
            onRowClick={handleNodeClicked}
          />
        </InfiniteScroll>
      )}
    </>
  );
};
