import { BackButton } from '@shared/components/BackButton/BackButton';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  DangerZone,
  DetailsHeader,
  DetailsTable,
  NodeEarnings,
  PageHeader,
  PageSection,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@shared/components';
import { NodeStatus } from '../NodeStatus/NodeStatus';

export function NodeView() {
  const [isMounted, setMounted] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { loadNode, deleteNode, stopNode, restartNode, isLoading, node } =
    useNodeView();

  const handleStop = () => stopNode(id);
  const handleRestart = () => restartNode(id);
  const handleDelete = () => deleteNode(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
    if (router.isReady) {
      loadNode(id);
    }
  }, [router.isReady]);

  if (!isMounted) return null;

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>

        {!isLoading ? (
          <>
            <DetailsHeader
              handleStop={handleStop}
              handleRestart={handleRestart}
              status={<NodeStatus status={node.status} />}
              title={node.name}
              ip={node.ip}
              date={node.created}
              id={node.id}
            />
            <DetailsTable bodyElements={node.details} />
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

      {!isLoading && (
        <PageSection>
          <NodeEarnings />
        </PageSection>
      )}

      <PageSection>
        <DangerZone
          elementName="Node"
          elementNameToCompare={node.name}
          handleDelete={handleDelete}
        ></DangerZone>
      </PageSection>
    </>
  );
}
