import { BackButton } from '@shared/components/BackButton/BackButton';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  DangerZone,
  DetailsTable,
  EmptyColumn,
  PageHeader,
  PageSection,
  PageTitle,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { NodeViewDetailsHeader } from './NodeViewDetailsHeader';
import { NodeViewConfig } from './NodeViewConfig';
import { ROUTES } from '@shared/index';

export function NodeView() {
  const [nodeError, setNodeError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { node, loadNode, deleteNode, stopNode, restartNode, isLoading } =
    useNodeView();

  const handleStop = () => stopNode(id);
  const handleRestart = () => restartNode(id!);
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteNode(id);
  };
  const handleNodeError = () => setNodeError(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (router.isReady) {
      loadNode(id, handleNodeError);
      setIsDeleting(false);
    }
  }, [id]);

  return (
    <>
      <PageTitle title="Nodes" />
      <PageSection bottomBorder={false} topPadding={false}>
        <div css={spacing.top.medium}>
          <PageHeader>
            <BackButton backUrl={ROUTES.NODES} />
          </PageHeader>
        </div>

        {!isLoading ? (
          <>
            {!nodeError ? (
              <>
                <NodeViewDetailsHeader
                  handleStop={handleStop}
                  handleRestart={handleRestart}
                  status={node?.status!}
                  blockchainName={node?.blockchainName!}
                  title={node?.name!}
                  ip={node?.ip!}
                  date={node?.created!}
                  id={node?.id!}
                />
                <DetailsTable bodyElements={node?.details!} />
              </>
            ) : (
              <EmptyColumn
                title="Node Not Found"
                description="No node exists with this ID"
              />
            )}
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
      {node?.nodeTypeConfig && !isLoading && !nodeError && (
        <PageSection bottomBorder={false}>
          <NodeViewConfig />
        </PageSection>
      )}
      {!nodeError && !isLoading && (
        <PageSection bottomBorder={false}>
          <DangerZone
            isLoading={isDeleting}
            elementName="Node"
            elementNameToCompare={node?.name!}
            handleAction={handleDelete}
          ></DangerZone>
        </PageSection>
      )}
    </>
  );
}
