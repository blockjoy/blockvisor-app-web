import { BackButton } from '@shared/components/BackButton/BackButton';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  DangerZone,
  DetailsTable,
  PageHeader,
  PageSection,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { NodeViewPageHeader } from './NodeViewPageHeader';
import { NodeViewDetailsHeader } from './NodeViewDetailsHeader';
import { NodeViewConfig } from './NodeViewConfig';

export function NodeView() {
  const [isMounted, setMounted] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { node, loadNode, deleteNode, stopNode, restartNode, isLoading } =
    useNodeView();

  const handleStop = () => stopNode(id);
  const handleRestart = () => restartNode(id!);
  const handleDelete = async () => deleteNode(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (router.isReady) {
      setMounted(true);
      loadNode(id);
    }
  }, [id]);

  if (!isMounted) return null;

  return (
    <>
      <NodeViewPageHeader />
      <PageSection topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton />
          </PageHeader>
        </div>

        {!isLoading ? (
          <>
            <NodeViewDetailsHeader
              handleStop={handleStop}
              handleRestart={handleRestart}
              status={node?.status!}
              blockchainId={node?.blockchainId!}
              title={node?.name!}
              ip={node?.ip!}
              date={node?.created!}
              id={node?.id!}
            />
            <DetailsTable bodyElements={node?.details!} />
          </>
        ) : (
          <>
            <SkeletonGrid padding="10px 0 70px">
              <Skeleton width="260px" />
              <Skeleton width="180px" />
            </SkeletonGrid>
            <TableSkeleton />
          </>
        )}
      </PageSection>
      {node?.nodeTypeConfig && !isLoading && <NodeViewConfig />}
      <PageSection>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DangerZone
            elementName="Node"
            elementNameToCompare={node?.name!}
            handleDelete={handleDelete}
          ></DangerZone>
        )}
      </PageSection>
    </>
  );
}
