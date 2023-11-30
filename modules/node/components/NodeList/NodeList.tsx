import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import isEqual from 'lodash/isEqual';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import {
  TableSkeleton,
  EmptyColumn,
  PageTitle,
  Table,
  TableGrid,
} from '@shared/components';
import { toGrid } from '@modules/node/utils';
import { NodeFilters } from './NodeFilters/NodeFilters';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';
import { useNodeUIContext } from '../../ui/NodeUIContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { resultsStatus } from '@modules/node/utils';
import { wrapper } from 'styles/wrapper.styles';
import { useRouter } from 'next/router';
import { spacing } from 'styles/utils.spacing.styles';
import { mapNodeListToRows } from '@modules/node/utils';
import IconNode from '@public/assets/icons/app/Node.svg';
import { ROUTES } from '@shared/constants/routes';

export const NodeList = () => {
  const router = useRouter();

  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const { loadNodes, nodeList, nodeCount, isLoading } = useNodeList();

  const handleNodeClicked = (nodeId: string) => {
    nodeUIProps.setQueryParams({
      ...nodeUIProps.queryParams,
      pagination: {
        ...nodeUIProps.queryParams.pagination,
      },
    });

    router.push(ROUTES.NODE(nodeId));
  };

  const hasMoreNodes =
    nodeCount !== nodeList?.length &&
    nodeUIContext.queryParams.pagination.current_page *
      nodeUIContext.queryParams.pagination.items_per_page +
      nodeUIContext.queryParams.pagination.items_per_page <
      nodeCount;

  const activeListType = useRecoilValue(nodeAtoms.activeListType);

  const currentQueryParams = useRef(nodeUIProps.queryParams);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, nodeUIProps.queryParams)) {
      loadNodes(nodeUIProps.queryParams, !nodeList?.length);
      currentQueryParams.current = nodeUIProps.queryParams;
    }
  }, [nodeUIProps.queryParams]);

  const updateQueryParams = () => {
    const newCurrentPage = nodeUIProps.queryParams.pagination.current_page + 1;
    const newQueryParams = {
      ...nodeUIProps.queryParams,

      pagination: {
        ...nodeUIProps.queryParams.pagination,
        current_page: newCurrentPage,
        scrollPosition: window.scrollY,
      },
    };

    nodeUIProps.setQueryParams(newQueryParams);
  };

  const cells = toGrid(nodeList!, handleNodeClicked);

  const { headers, rows } = mapNodeListToRows(nodeList);

  const { isFiltered, isEmpty } = resultsStatus(
    nodeList?.length!,
    nodeUIProps.queryParams.filter,
  );

  return (
    <>
      <PageTitle title="Nodes" icon={<IconNode />} />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeFilters isLoading={isLoading} />
        <div css={styles.nodeListWrapper}>
          <NodeListHeader />
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
              next={updateQueryParams}
              hasMore={hasMoreNodes}
              style={{ overflow: 'hidden' }}
              scrollThreshold={0.75}
              loader={''}
            >
              {activeListType === 'table' ? (
                <Table
                  isLoading={isLoading}
                  headers={headers}
                  preload={0}
                  rows={rows}
                  fixedRowHeight="120px"
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
