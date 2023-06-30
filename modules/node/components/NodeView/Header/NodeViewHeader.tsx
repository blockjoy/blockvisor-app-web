import {
  PageSection,
  Skeleton,
  SkeletonGrid,
  SvgIcon,
} from '@shared/components';
import { FC, useState } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewHeader.styles';
import { BlockchainIcon } from '@shared/components';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNodeView } from '@modules/node';
import IconNodes from '@public/assets/icons/app/Node.svg';
import { NodeViewHeaderActions } from './Actions/NodeViewHeaderActions';
import { NodeViewHeaderDelete } from './Delete/NodeViewHeaderDelete';
import { nodeTypeList } from '@shared/constants/lookups';
import { wrapper } from 'styles/wrapper.styles';

export const NodeViewHeader: FC = () => {
  const { node, isLoading } = useNodeView();

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleDeleteModalClosed = () => {
    setIsDeleteMode(false);
  };

  const toggleDeleteModalOpen = () => setIsDeleteMode(!isDeleteMode);

  return (
    <>
      {isDeleteMode && (
        <NodeViewHeaderDelete onHide={handleDeleteModalClosed} />
      )}

      <div css={wrapper.main}>
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

                    {node!.ip && (
                      <small css={[typo.small, colors.text2]}>{node!.ip}</small>
                    )}
                    {node!.createdAt && (
                      <small css={[typo.small, colors.text2]}>
                        {formatDistanceToNow(node!.createdAt, {
                          addSuffix: true,
                        })}
                      </small>
                    )}
                  </div>
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
      </div>
    </>
  );
};
