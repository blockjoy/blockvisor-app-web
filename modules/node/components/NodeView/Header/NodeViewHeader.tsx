import {
  DeleteModal,
  NodeStatus,
  Skeleton,
  SkeletonGrid,
} from '@shared/components';
import { useState } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewHeader.styles';
import { BlockchainIcon } from '@shared/components';
import {
  NodeViewReportProblem,
  useNodeDelete,
  useNodeView,
} from '@modules/node';
import { wrapper } from 'styles/wrapper.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { NodeViewHeaderActions } from './Actions/NodeViewHeaderActions';
import { toast } from 'react-toastify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getNodeJobProgress } from '@modules/node/utils/getNodeJobProgress';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';

export const NodeViewHeader = () => {
  const router = useRouter();
  const { node, isLoading } = useNodeView();
  const { deleteNode } = useNodeDelete();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isReportProblemMode, setIsReportProblemMode] = useState(false);

  const progress = getNodeJobProgress(node!);

  const toggleDeleteModalOpen = () => setIsDeleteMode(!isDeleteMode);
  const toggleReportProblemModalOpen = () =>
    setIsReportProblemMode(!isReportProblemMode);

  const handleDeleteNode = () => {
    deleteNode(node!.id, node!.hostId, () => {
      router.push(ROUTES.NODES);
      toggleDeleteModalOpen();
      toast.success('Node Deleted');
    });
  };

  const handleReportProblem = (message: string) => {
    // TODO: Report the problem
    toast.success('Problem Reported');
    toggleReportProblemModalOpen();
  };

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-node-modal"
          elementName={node?.name!}
          entityName="Node"
          onHide={toggleDeleteModalOpen}
          onSubmit={handleDeleteNode}
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
                    blockchainName={node!.blockchainName}
                  />
                </div>
                <div>
                  <h2 css={styles.detailsHeader}>{node!.name}</h2>
                  <div css={styles.detailsFooter}>
                    <div css={styles.nodeType}>
                      <p>
                        {node.blockchainName}{' '}
                        {convertNodeTypeToName(node?.nodeType)}
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
                    loadingCurrent={progress?.current}
                    loadingTotal={progress?.total}
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
