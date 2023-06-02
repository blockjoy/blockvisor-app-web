import { Copy, PageTitle, Skeleton } from '@shared/components';
import { styles } from './HostViewTitle.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { NodeTitle } from '@modules/node';
import { useHostView } from '@modules/host';
import IconUnion from '@public/assets/icons/union-16.svg';

export const HostViewTitle = () => {
  const router = useRouter();

  const { host, isLoading } = useHostView();

  const handleNodesClicked = () => router.push(ROUTES.HOSTS);

  return (
    <PageTitle>
      <div css={styles.breadcrumb}>
        <button onClick={handleNodesClicked} css={styles.nodesButton}>
          <NodeTitle titleText="Hosts" icon={<IconUnion />} />
        </button>
        <span css={styles.separator}>/</span>
        {isLoading !== 'finished' && !host?.id ? (
          <Skeleton width="80px" />
        ) : !isLoading && !host?.id ? (
          <p>Host not found</p>
        ) : (
          <Copy value={host?.id!}>{host?.id}</Copy>
        )}
      </div>
    </PageTitle>
  );
};
