import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  DeleteModal,
  NodeStatus,
  Skeleton,
  SkeletonGrid,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewHeader.styles';
import { BlockchainIcon } from '@shared/components';
import {
  NodeViewReportProblem,
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
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isReportProblemMode, setIsReportProblemMode] = useState(false);

  const [isSaving, setIsSaving] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const progress = getNodeJobProgress(node!);

  useEffect(() => {
    if (!isDeleteMode && error) setError('');
  }, [isDeleteMode]);

  const toggleDeleteModalOpen = () => setIsDeleteMode(!isDeleteMode);
  const toggleReportProblemModalOpen = () =>
    setIsReportProblemMode(!isReportProblemMode);

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
    toggleReportProblemModalOpen();
  };

  const handleUpdateNode = async (value: string) => {
    setIsSaving(true);
    await updateNode({
      displayName: value,
      ids: [node?.id!],
    });
    toast.success('Node name updated');
    setIsSaving(false);
  };

  const handleEditClicked = () => {
    setIsSaving(null);
  };

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-node-modal"
          elementName={escapeHtml(node?.displayName!)}
          entityName="Node"
          onHide={toggleDeleteModalOpen}
          onSubmit={handleDeleteNode}
          error={error}
        />
      )}

      {isReportProblemMode && (
        <NodeViewReportProblem
          onSubmit={handleReportProblem}
          onHide={toggleReportProblemModalOpen}
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
                  {/* <h2 css={styles.detailsHeader}>{node!.displayName}</h2> */}
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
                  <NodeViewHeaderActions
                    onDeleteClicked={toggleDeleteModalOpen}
                    onReportProblemClicked={toggleReportProblemModalOpen}
                  />
                </div>
              </>
            )
          )}
        </header>
      </section>
    </>
  );
};
