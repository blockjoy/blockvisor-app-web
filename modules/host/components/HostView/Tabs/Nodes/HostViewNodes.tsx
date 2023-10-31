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
import { useState } from 'react';
import { toast } from 'react-toastify';
import NextLink from 'next/link';

type NodeToDelete = {
  id: string;
  name: string;
};

export const HostViewNodes = () => {
  const router = useRouter();
  const { nodeList, isLoading } = useNodeList();
  const { host, isLoading: isLoadingActiveHost } = useHostView();
  const { defaultOrganization } = useDefaultOrganization();
  const hostNodes = nodeList?.filter((node: Node) => node.hostId === host?.id);
  const { hasPermission } = usePermissions();
  const { deleteNode } = useNodeDelete();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<NodeToDelete>();

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

  const { headers, rows } = mapHostNodesToRows(hostNodes!, handleDeleteClicked);

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
      ) : !Boolean(hostNodes?.length) ? (
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
        <Table
          hideHeader
          isLoading={isLoading}
          headers={headers}
          rows={rows}
          fixedRowHeight="120px"
          onRowClick={handleNodeClicked}
        />
      )}
    </>
  );
};
