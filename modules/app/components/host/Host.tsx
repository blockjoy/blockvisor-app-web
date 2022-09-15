import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { PageSection, PageHeader } from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DangerZone } from '../shared/danger-zone/DangerZone';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';
import { useHost } from '@modules/app/hooks/useHost';
import { useEffect, useState } from 'react';
import { appState } from '@modules/app/store';
import {
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
  Table,
  HostStatus,
} from '../shared';
import { Row } from '../shared/table/Table';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';

export type Host = {
  name: string;
  status: number;
  ip: string;
  location: string;
  details: { label: string; data: string }[];
  nodes: Row[];
};

export default () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { loadHost, restartHost, stopHost, deleteHost } = useHost();
  const { host, hostLoading } = useRecoilValue(appState);

  const handleNodeClicked = (args: Row) => router.push(`/nodes/${args.key}`);
  const handleRestartHost = () => restartHost(id?.toString()!);
  const handleStopHost = () => stopHost(id?.toString()!);
  const handleDelete = () => deleteHost(id?.toString()!);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMounted(true);
    if (router.isReady) {
      loadHost(id?.toString() || '');
    }
  }, [router.isReady]);

  if (!isMounted) return null;

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
              status={<HostStatus status={host.status} />}
              location={host.location}
              handleRestart={handleRestartHost}
              handleStop={handleStopHost}
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
      <PageSection>
        <h2 css={[typo.large, spacing.bottom.large]}>Nodes</h2>
        <Table
          isSorting={false}
          isLoading={hostLoading}
          headers={[
            {
              name: 'Name',
              width: '40%',
              key: '1',
            },
            {
              name: 'Status',
              key: '2',
              width: '30%',
            },
            {
              name: '',
              key: '3',
              width: '10%',
              isHiddenOnMobile: true,
            },
          ]}
          rows={host.nodes}
          onRowClick={handleNodeClicked}
        />
      </PageSection>
      <PageSection>
        <DangerZone
          elementName="Host"
          elementNameToCompare={host.name}
          handleDelete={handleDelete}
        />
      </PageSection>
    </>
  );
};
