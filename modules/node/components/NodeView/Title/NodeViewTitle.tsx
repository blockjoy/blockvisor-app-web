import { CopyNode, PageTitle, SvgIcon, Skeleton } from '@shared/components';
import { styles } from './NodeViewTitle.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useNodeView } from '@modules/node';
import IconNodes from '@public/assets/icons/box-12.svg';

export const NodeViewTitle = () => {
  const router = useRouter();

  const { node, isLoading } = useNodeView();

  const handleNodesClicked = () => router.push(ROUTES.NODES);

  return (
    <PageTitle>
      <div css={styles.breadcrumb}>
        <button onClick={handleNodesClicked} css={styles.nodesButton}>
          <SvgIcon size="20px">
            <IconNodes />
          </SvgIcon>
          <p>Nodes</p>
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
