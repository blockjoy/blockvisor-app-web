import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { PageSection, PageHeader } from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DangerZone } from '../shared/danger-zone/DangerZone';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';
import { useHost } from '@modules/app/hooks/useHost';
import { useEffect } from 'react';
import { appState } from '@modules/app/store';
import { Skeleton, SkeletonGrid, TableSkeleton } from '../shared';

export type Host = {
  name: string;
  status: string;
  ip: string;
  location: string;
  details: { label: string; data: string }[];
};

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const { loadHost } = useHost();
  const { host, hostLoading } = useRecoilValue(appState);

  useEffect(() => {
    if (router.isReady) {
      loadHost(id?.toString() || '');
    }
  }, [router.isReady]);

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        {!hostLoading ? (
          <>
            <DetailsHeader
              title={host.name}
              ip={host.ip}
              status={host.status}
              location={host.location}
            />
            <DetailsTable bodyElements={host.details} />
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
      <PageSection>nodes list</PageSection>
      <PageSection>
        <DangerZone handleDelete={() => console.log('handle delete')}>
          <p>No longer need this node?</p>
          <small>Click the button below to delete it.</small>
        </DangerZone>
      </PageSection>
    </>
  );
};
