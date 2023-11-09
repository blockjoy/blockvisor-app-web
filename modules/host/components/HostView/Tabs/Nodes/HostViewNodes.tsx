import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { mapHostNodesToRows, useHostView } from '@modules/host';
import { useNodeDelete, useNodeList } from '@modules/node';
import {
  Alert,
  DeleteModal,
  EmptyColumn,
  Table,
  TableSkeleton,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useDefaultOrganization } from '@modules/organization';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NextLink from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

type NodeToDelete = {
  id: string;
  name: string;
};

const itemsPerPage = 48;

export const HostViewNodes = () => {
  const router = useRouter();
  const { id } = router.query;
  const { nodeListByHost, isLoading, listNodesByHost, nodeListByHostCount } =
    useNodeList();
  const { host, isLoading: isLoadingActiveHost } = useHostView();
  const { defaultOrganization } = useDefaultOrganization();
  const { hasPermission } = usePermissions();
  const { deleteNode } = useNodeDelete();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<NodeToDelete>();
  const [pageIndex, setPageIndex] = useState(0);

  const hasMoreNodes =
    pageIndex * itemsPerPage + itemsPerPage < nodeListByHostCount;

  const handleDeleteNode = () => {
    deleteNode(nodeToDelete?.id!, host!.id, () => {
      setIsDeleteMode(false);
      toast.success('Node Deleted');
    });
  };

  const handleDeleteClicked = (node: NodeToDelete) => {
    setNodeToDelete(node);
    setIsDeleteMode(true);
  };

  const handleNodeClicked = (id: string) => router.push(ROUTES.NODE(id));

  const { headers, rows } = mapHostNodesToRows(
    nodeListByHost!,
    handleDeleteClicked,
  );

  useEffect(() => {
    if (router.isReady) {
      listNodesByHost(id as string, {
        current_page: pageIndex,
        items_per_page: itemsPerPage,
      });
    }
  }, [pageIndex, router.isReady]);

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-node-modal"
          elementName={nodeToDelete?.name!}
          entityName="Node"
          onHide={() => setIsDeleteMode(false)}
          onSubmit={handleDeleteNode}
        />
      )}

      {hasPermission('node-admin-list') && (
        <Alert isSuccess>
          Showing nodes for{' '}
          <NextLink href={ROUTES.ORGANIZATION(defaultOrganization?.id!)}>
            {defaultOrganization?.name}
          </NextLink>{' '}
          organization.
        </Alert>
      )}

      {isLoading !== 'finished' && isLoadingActiveHost !== 'finished' ? (
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
            isLoading={isLoading}
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
