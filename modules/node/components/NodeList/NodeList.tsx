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
  DeleteModal,
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
import { useNodeDelete } from '@modules/node/hooks/useNodeDelete';
import { toast } from 'react-toastify';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const NodeList = () => {
  const router = useRouter();

  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      queryParams: nodeUIContext.queryParams,
      setQueryParams: nodeUIContext.setQueryParams,
    };
  }, [nodeUIContext]);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [nodeToDelete, setNodeToDelete] =
    useState<{ id: string; name: string; hostId: string }>();

  const { loadNodes, nodeList, nodeCount, isLoading } = useNodeList();
  const { deleteNode } = useNodeDelete();

  const handleNodeDeleted = () => {
    deleteNode(nodeToDelete?.id, nodeToDelete?.hostId!, () => {
      handleNodeDeleteClosed();
      toast.success('Node Deleted');
    });
  };

  const handleNodeClicked = (nodeId: string) =>
    router.push(ROUTES.NODE(nodeId));

  const handleNodeDeleteClicked = (node: Node) => {
    setIsDeleteMode(true);
    setNodeToDelete(node);
  };

  const handleNodeDeleteClosed = () => setIsDeleteMode(false);

  const hasMoreNodes =
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

  useEffect(() => {
    if (router.isReady) {
      loadNodes(nodeUIProps.queryParams, false);
    }
  }, [router.isReady]);

  const updateQueryParams = () => {
    const newCurrentPage = nodeUIProps.queryParams.pagination.current_page + 1;
    const newQueryParams = {
      ...nodeUIProps.queryParams,

      pagination: {
        ...nodeUIProps.queryParams.pagination,
        current_page: newCurrentPage,
      },
    };

    nodeUIProps.setQueryParams(newQueryParams);
  };

  const cells = toGrid(nodeList!, handleNodeClicked, handleNodeDeleteClicked);

  const { headers, rows } = mapNodeListToRows(
    nodeList,
    handleNodeDeleteClicked,
  );

  const { isFiltered, isEmpty } = resultsStatus(
    nodeList?.length!,
    nodeUIProps.queryParams.filter,
  );

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-node-modal"
          elementName={nodeToDelete?.name!}
          entityName="Node"
          onHide={handleNodeDeleteClosed}
          onSubmit={handleNodeDeleted}
        />
      )}
      <PageTitle title="Nodes" icon={<IconNode />} />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeFilters isLoading={isLoading} />
        <div css={styles.nodeListWrapper}>
          <NodeListHeader />
          {isLoading === 'initializing' && nodeList === undefined ? (
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
