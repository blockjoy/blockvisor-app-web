import { PageTitle, Skeleton } from '@shared/components';
import { styles } from './NodeViewTitle.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useNodeView, NodeTitle, CopyNode } from '@modules/node';

export const NodeViewTitle = () => {
  const router = useRouter();

  const { node, isLoading } = useNodeView();

  const handleNodesClicked = () => router.push(ROUTES.NODES);

  return (
    <PageTitle>
      <div css={styles.breadcrumb}>
        <button onClick={handleNodesClicked} css={styles.nodesButton}>
          <NodeTitle />
        </button>
        <span css={styles.separator}>/</span>

        {isLoading && !node?.id ? (
          <Skeleton width="80px" />
        ) : !isLoading && !node?.id ? (
          <p>Node not found</p>
        ) : (
          <CopyNode value={node?.id!}>{node?.id}</CopyNode>
        )}
      </div>
    </PageTitle>
  );
};
