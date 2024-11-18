import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { DeleteModal, Skeleton, SkeletonGrid } from '@shared/components';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewHeader.styles';
import { ProtocolIcon } from '@shared/components';
import {
  NodeTags,
  NodeViewReportProblem,
  useNodeAdd,
  useNodeDelete,
  useNodeList,
  useNodeView,
} from '@modules/node';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/constants/routes';
import { NodeViewHeaderActions } from './NodeViewHeaderActions/NodeViewHeaderActions';
import { useGetOrganizations } from '@modules/organization';
import { useHostList } from '@modules/host';
import { nodeClient } from '@modules/grpc';
import { escapeHtml, useNavigate, useViewport } from '@shared/index';
import { Copy, EditableTitle, NodeStatus } from '@shared/components';

export const NodeViewHeader = () => {
  const { navigate } = useNavigate();
  const { node, isLoading, updateNode } = useNodeView();
  const { getOrganizations } = useGetOrganizations();
  const { removeFromNodeList } = useNodeList();
  const { loadHosts } = useHostList();
  const { deleteNode } = useNodeDelete();
  const { createNode } = useNodeAdd();
  useViewport();

  const [isSaving, setIsSaving] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [actionView, setActionView] = useState<NodeAction | null>(null);

  const handleActionView = (action: NodeAction | null) => setActionView(action);
  const handleClose = () => setActionView(null);

  useEffect(() => {
    if (!actionView && error) setError('');
  }, [actionView]);

  const handleDeleteNode = () => {
    setError('');

    deleteNode(
      node!,
      () => {
        toast.success('Node Deleted');
        removeFromNodeList(node!.nodeId);

        navigate(ROUTES.NODES, () => {
          loadHosts();
          getOrganizations();
        });
      },
      (err) => setError(err),
    );
  };

  const handleReportProblem = async (message: string) => {
    await nodeClient.reportProblem(node?.nodeId!, message);
    toast.success('Problem Reported');
    handleClose();
  };

  const handleUpdateNode = async (newDisplayName: string) => {
    setIsSaving(true);
    await updateNode({
      newDisplayName,
      nodeId: node?.nodeId!,
      newValues: [],
    });
    toast.success('Node name updated');
    setIsSaving(false);
    handleClose();
  };

  const handleRecreateNode = async () => {
    if (!node) return;

    const params: NodeServiceCreateRequest = {
      oldNodeId: node.nodeId,
      orgId: node.orgId,
      launcher: undefined,
      imageId: node.protocolId,
      addRules: [],
      newValues: [],
      tags: node.tags,
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

  const hasTags = Boolean(node?.tags?.tags.length);

  return (
    <>
      {actionView === 'delete' && (
        <DeleteModal
          portalId="delete-node-modal"
          elementName={escapeHtml(node?.displayName! || node?.nodeName!)}
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
          elementName={escapeHtml(node?.displayName! || node?.nodeName!)}
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
          {isLoading && !node?.nodeId ? (
            <SkeletonGrid>
              <Skeleton width="400px" />
            </SkeletonGrid>
          ) : (
            node?.nodeId && (
              <>
                <div css={styles.blockchainIcon}>
                  <ProtocolIcon
                    size="40px"
                    protocolName={node.versionKey?.protocolKey}
                  />
                </div>
                <div css={styles.name}>
                  <div css={styles.title}>
                    <EditableTitle
                      initialValue={node.displayName! || node.nodeName}
                      isLoading={isLoading}
                      isSaving={isSaving!}
                      additionalContentRight={
                        <Copy value={node.displayName!} />
                      }
                      onSaveClicked={handleUpdateNode}
                      onEditClicked={handleEditClicked}
                      canUpdate
                    />
                  </div>
                  <div css={styles.content}>
                    <NodeTags node={node} additionalStyles={[styles.tags]} />
                    <div css={styles.detailsFooter}>
                      <div css={styles.nodeType}>
                        <p>
                          {node.versionKey?.protocolKey}
                          {' | '}
                          {node.versionKey?.variantKey}
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
                </div>
                <div css={styles.nodeStatus}>
                  <NodeStatus
                    status={node.nodeStatus?.state!}
                    protocolStatus={node.nodeStatus?.protocol?.state}
                    jobs={node.jobs}
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
