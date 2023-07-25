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
import { useNodeView } from '@modules/node';
import { nodeTypeList } from '@shared/constants/lookups';
import { wrapper } from 'styles/wrapper.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { NodeViewHeaderActions } from './Actions/NodeViewHeaderActions';
import { toast } from 'react-toastify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const NodeViewHeader = () => {
  const router = useRouter();
  const { node, isLoading, deleteNode } = useNodeView();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const toggleDeleteModalOpen = () => setIsDeleteMode(!isDeleteMode);

  const handleDeleteNode = () => {
    deleteNode(node!.id, node!.hostId, () => {
      router.push(ROUTES.NODES);
      toggleDeleteModalOpen();
      toast.success('Node Deleted');
    });
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
                        {
                          nodeTypeList.find((t) => t.id === node!.nodeType)
                            ?.name
                        }
                      </p>
                    </div>
                    {node!.createdAt && (
                      <small css={[typo.small, colors.text2]}>
                        Launched{' '}
                        {formatDistanceToNow(node!.createdAt, {
                          addSuffix: true,
                        })}
                      </small>
                    )}
                  </div>
                </div>
                <div css={styles.nodeStatus}>
                  <NodeStatus status={node.status} />
                </div>
                <div css={styles.actions}>
                  <NodeViewHeaderActions
                    onDeleteClicked={toggleDeleteModalOpen}
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
