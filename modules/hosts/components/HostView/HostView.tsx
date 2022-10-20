import { useRouter } from 'next/router';
import { useHosts } from '@modules/hosts/hooks/useHosts';
import { MouseEventHandler, useEffect, useState } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { HostStatus } from '../../../../shared/components/HostStatus/HostStatus';
import { formatDistanceToNow } from 'date-fns';
import { nodeListToRow } from '../../utils/toRow';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import {
  BackButton,
  DangerZone,
  DetailsHeader,
  DetailsTable,
  PageHeader,
  PageSection,
  Skeleton,
  SkeletonGrid,
  Table,
  TableSkeleton,
} from '@shared/components';
import { HostCharts } from '../HostCharts/HostCharts';

function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getHostDetails(host: Host | null) {
  if (!host) {
    return null;
  }

  const details = [
    {
      label: 'CREATED',
      data: formatDistanceToNow(new Date(host.created_at_datetime), {
        addSuffix: true,
      }),
    },
    { label: 'VERSION', data: host.version },
    { label: 'DISK SIZE', data: formatBytes(host.diskSize)?.toString() },
    { label: 'MEMORY SIZE', data: formatBytes(host.memSize)?.toString() },
    { label: 'CPU Count', data: host.cpuCount?.toString() },
  ];

  return details;
}

export function Host() {
  const [isMounted, setMounted] = useState<boolean>(false);
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
    const nodeIdString = e.currentTarget.id;
    const nodeId = nodeIdString!;
    const hostId = id?.toString()!;
    await apiClient.execStopNode(hostId, nodeId);
    toast.success(`Node Stopped`);
  };
  const handleRestartNode: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    const uuid = id;

    await apiClient.execRestartNode(uuid);
    toast.success(`Node Restarted`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
    loadHost(id?.toString() || '');
  }, []);

  const hostRow = nodeListToRow(host, handleStopNode, handleRestartNode);

  const hostDetails = getHostDetails(host);

  if (!isMounted) return null;

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
            <HostCharts />
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
