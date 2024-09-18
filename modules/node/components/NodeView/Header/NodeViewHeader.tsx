import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  DeleteModal,
  NodeStatus,
  Skeleton,
  SkeletonGrid,
} from '@shared/components';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewHeader.styles';
import { BlockchainIcon } from '@shared/components';
import {
  convertNodeTypeToName,
  NodeViewReportProblem,
  useNodeAdd,
  useNodeDelete,
  useNodeList,
  useNodeView,
} from '@modules/node';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/constants/routes';
import { NodeViewHeaderActions } from './Actions/NodeViewHeaderActions';
import { getNodeJobProgress } from '@modules/node/utils/getNodeJobProgress';
import { useGetOrganizations } from '@modules/organization';
import { useHostList } from '@modules/host';
import { nodeClient } from '@modules/grpc';
import { escapeHtml, useNavigate } from '@shared/index';
import { EditableTitle } from '@shared/components';

export const NodeViewHeader = () => {
  const { navigate } = useNavigate();
  const { node, isLoading, updateNode } = useNodeView();
  const { getOrganizations } = useGetOrganizations();
  const { removeFromNodeList } = useNodeList();
  const { loadHosts } = useHostList();
  const { deleteNode } = useNodeDelete();
  const { createNode } = useNodeAdd();

  const [isSaving, setIsSaving] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [actionView, setActionView] = useState<NodeAction | null>(null);

  const handleActionView = (action: NodeAction | null) => setActionView(action);
  const handleClose = () => setActionView(null);

  const progress = getNodeJobProgress(node!);

  useEffect(() => {
    if (!actionView && error) setError('');
  }, [actionView]);

  const handleDeleteNode = () => {
    setError('');

    deleteNode(
      node!,
      () => {
        toast.success('Node Deleted');
        removeFromNodeList(node!.id);

        navigate(ROUTES.NODES, () => {
          loadHosts();
          getOrganizations();
        });
      },
      (err) => setError(err),
    );
  };

  const handleReportProblem = async (message: string) => {
    await nodeClient.reportProblem(node?.id!, message);
    toast.success('Problem Reported');
    handleClose();
  };

  const handleUpdateNode = async (value: string) => {
    setIsSaving(true);
    await updateNode({
      displayName: value,
      ids: [node?.id!],
    });
    toast.success('Node name updated');
    setIsSaving(false);
    handleClose();
  };

  const handleRecreateNode = async () => {
    if (!node) return;

    const params: NodeServiceCreateRequest = {
      oldNodeId: node.id,
      orgId: node.orgId,
      blockchainId: node.blockchainId,
      version: node.version,
      nodeType: node.nodeType,
      properties: node.properties,
      network: node.network,
      placement: node.placement,
      allowIps: node.allowIps,
      denyIps: node.denyIps,
    };

    await createNode(
      params,
      () => toast.success('Node successfully recreated'),
      () => setError('Error recreating node. Please try again'),
    );

    handleClose();
  };

  const handleEditClicked = () => {
    setIsSaving(null);
  };

  return (
    <>
      {actionView === 'delete' && (
        <DeleteModal
          portalId="delete-node-modal"
          elementName={escapeHtml(node?.displayName!)}
          entityName="Node"
          onHide={handleClose}
          onSubmit={handleDeleteNode}
          error={error}
        />
      )}

      {actionView === 'recreate' && (
        <DeleteModal
          portalId="recreate-node-modal"
          type="Recreate"
          elementName={escapeHtml(node?.displayName!)}
          entityName="Node"
          onHide={handleClose}
          onSubmit={handleRecreateNode}
          error={error}
        />
      )}

      {actionView === 'report' && (
        <NodeViewReportProblem
          onSubmit={handleReportProblem}
          onHide={handleClose}
        />
      )}

      <section css={wrapper.main}>
        <header css={styles.header}>
          {isLoading && !node?.id ? (
            <SkeletonGrid>
              <Skeleton width="400px" />
            </SkeletonGrid>
          ) : (
            node?.id && (
              <>
                <div css={styles.blockchainIcon}>
                  <BlockchainIcon
                    size="40px"
                    blockchainName={node.blockchainName}
                  />
                </div>
                <div>
                  <EditableTitle
                    initialValue={node.displayName}
                    isLoading={isLoading}
                    isSaving={isSaving!}
                    onSaveClicked={handleUpdateNode}
                    onEditClicked={handleEditClicked}
                    canUpdate
                  />
                  <div css={styles.detailsFooter}>
                    <div css={styles.nodeType}>
                      <p>
                        {node.blockchainName}
                        {' | '}
                        {convertNodeTypeToName(node.nodeType)}
                        {' | '}
                        {node.network}
                      </p>
                    </div>
                    {node!.createdAt && (
                      <p css={[typo.small, colors.text2]}>
                        Launched{' '}
                        {formatDistanceToNow(node!.createdAt, {
                          addSuffix: true,
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <div css={styles.nodeStatus}>
                  <NodeStatus
                    status={node.status}
                    downloadingCurrent={progress?.current}
                    downloadingTotal={progress?.total}
                  />
                </div>
                <div css={styles.actions}>
                  <NodeViewHeaderActions handleActionView={handleActionView} />
                </div>
              </>
            )
          )}
        </header>
      </section>
    </>
  );
};
