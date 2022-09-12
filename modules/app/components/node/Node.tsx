import { useRecoilValue } from 'recoil';
import {
  PageSection,
  PageHeader,
  SkeletonGrid,
  Skeleton,
  TableSkeleton,
} from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';
import { DangerZone } from '../shared/danger-zone/DangerZone';
import { appState } from '@modules/app/store';
import { useNode } from '@modules/app/hooks/useNode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
  const router = useRouter();
  const { id } = router.query;
  const { loadNode } = useNode();
  const { node, nodeLoading } = useRecoilValue(appState);

  useEffect(() => {
    if (router.isReady) {
      loadNode(id?.toString() || '');
    }
  }, [router.isReady]);

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>

        {!nodeLoading ? (
          <>
            <DetailsHeader
              status={node.status.toString()}
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
      <PageSection>
        {nodeLoading ? (
          <>
            <Skeleton width="200px" margin="0 0 20px" />
            <Skeleton width="100%" height="400px" />
          </>
        ) : (
          <NodeEarnings />
        )}
      </PageSection>
      <PageSection>
        <DangerZone handleDelete={() => console.log('handle delete')}>
          <p>No longer need this node?</p>
          <small>Click the button below to delete it.</small>
        </DangerZone>
      </PageSection>
    </>
  );
};
