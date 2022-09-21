import { useRouter } from 'next/router';
import { PageSection, PageHeader } from '../../app/components/shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DangerZone } from '../../app/components/shared/danger-zone/DangerZone';
import { DetailsHeader } from '../../app/components/shared/details-header/DetailsHeader';
import { DetailsTable } from '../../app/components/shared/details-table/DetailsTable';
import { useHosts } from '@modules/hosts/hooks/useHosts';
import { MouseEventHandler, useEffect } from 'react';
import {
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
  Table,
} from '../../app/components/shared';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { HostStatus } from './HostStatus/HostStatus';
import { formatDistanceToNow } from 'date-fns';
import { nodeListToRow } from '../utils/toRow';
import { Uuid } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';

function getHostDetails(host: Host | null) {
  if (!host) {
    return null;
  }

  const details = [
    {
      label: 'CREATED',
      data: formatDistanceToNow(new Date(host.createdAt.seconds), {
        addSuffix: true,
      }),
    },
    { label: 'VERSION', data: host.version },
    { label: 'DISK SIZE', data: host.diskSize.toString() },
    { label: 'MEMORY SIZE', data: host.memSize.toString() },
  ];

  return details;
}

export function Host() {
  const router = useRouter();
  const { id } = router.query;
  const { loadHost, restartHost, stopHost, deleteHost, host, loadingHost } =
    useHosts();

  const handleNodeClicked = (args: Row) => router.push(`/nodes/${args.key}`);
  const handleRestartHost = () => restartHost(id?.toString()!);
  const handleStopHost = () => stopHost(id?.toString()!);
  const handleDelete = () => deleteHost(id?.toString()!);

  // refactor these to utilize useNode hook
  const handleStopNode: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    console.log('stopping id', id);
    const uuid = new Uuid();
    uuid.setValue(id!);
    await apiClient.execStopNode(uuid);
    toast.success(`Node Stopped`);
  };
  const handleRestartNode: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    const uuid = new Uuid();
    uuid.setValue(id);
    await apiClient.execRestartNode(uuid);
    toast.success(`Node Restarted`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadHost(id?.toString() || '');
  }, []);

  const hostRow = nodeListToRow(host, handleStopNode, handleRestartNode);
  const hostDetails = getHostDetails(host);

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        {!loadingHost && host ? (
          <>
            <DetailsHeader
              title={host.name}
              ip={host.ip}
              status={<HostStatus status={host.status} />}
              location={host.location}
              handleRestart={handleRestartHost}
              handleStop={handleStopHost}
            />
            <DetailsTable bodyElements={hostDetails ?? []} />
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
          isLoading={loadingHost}
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
          rows={hostRow}
          onRowClick={handleNodeClicked}
        />
      </PageSection>
      <PageSection>
        <DangerZone
          elementName="Host"
          elementNameToCompare={host?.name ?? ''}
          handleDelete={handleDelete}
        />
      </PageSection>
    </>
  );
}
