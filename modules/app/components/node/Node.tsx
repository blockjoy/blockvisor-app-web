import { useRecoilValue } from 'recoil';
import {
  PageSection,
  PageHeader,
  SkeletonGrid,
  Skeleton,
  TableSkeleton,
  NodeStatus,
} from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';
import { DangerZone } from '../shared/danger-zone/DangerZone';
import { appState } from '@modules/app/store';
import { useNode } from '@modules/app/hooks/useNode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NodeEarnings } from '@shared/components';

export type Node = {
  id: string;
  name: string;
  ip: string;
  created: string;
  status: number;
  details: { label: string; data: string }[];
};

export default () => {
  const [isMounted, setMounted] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { loadNode, deleteNode, stopNode, restartNode } = useNode();
  const { node, nodeLoading } = useRecoilValue(appState);

  const handleStop = () => stopNode(id);
  const handleRestart = () => restartNode(id);
  const handleDelete = () => deleteNode(id);

  useEffect(() => {
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

        {!nodeLoading ? (
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

      {!nodeLoading && (
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
};
