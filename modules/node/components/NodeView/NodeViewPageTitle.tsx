import { PageTitle, SvgIcon, CopyNode } from '@shared/components';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { styles } from './NodeViewPageTitle.styles';
import { useNodeView } from '@modules/node';
import IconNodes from '@public/assets/icons/box-12.svg';

export const NodeViewPageTitle = () => {
  const router = useRouter();

  const { node } = useNodeView();

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
        <CopyNode value={node?.id!}>{node?.id}</CopyNode>
      </div>
    </PageTitle>
  );
};
