import { useRouter } from 'next/router';
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
import { HostCharts } from './HostCharts/HostCharts';
import { GrpcHostObject } from '@modules/client/grpc_client';
import { useGetHostById } from '@modules/hosts/hooks/useGetHostById';
import { useRestartHost } from '@modules/hosts/hooks/useRestartHost';
import { queryAsString } from '@shared/utils/query';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useStopHost } from '@modules/hosts/hooks/useStopHost';
import { useDeleteHost } from '@modules/hosts/hooks/useDeleteHost';

function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getHostDetails(host: GrpcHostObject | null) {
  if (!host) {
    return null;
  }

  const details = [
    {
      label: 'CREATED',
      data: formatDistanceToNow(
        new Date(host.created_at_datetime?.toDateString() ?? ''),
        {
          addSuffix: true,
        },
      ),
    },
    { label: 'VERSION', data: host.version ?? '' },
    {
      label: 'DISK SIZE',
      data: formatBytes(host.diskSize ?? 0)?.toString() ?? '',
    },
    {
      label: 'MEMORY SIZE',
      data: formatBytes(host.memSize ?? 0)?.toString() ?? '',
    },
    { label: 'CPU Count', data: host.cpuCount?.toString() ?? '' },
  ];

  return details;
}

export function Host() {
  const [isMounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { restartHost } = useRestartHost();
  const { deleteHost } = useDeleteHost();
  const { stopHost } = useStopHost();
  const { getHostById, loading, host } = useGetHostById();

  const handleNodeClicked = (args: Row) => router.push(`/nodes/${args.key}`);
  const handleRestartHost = async () => {
    try {
      await restartHost(queryAsString(id));
      toast.success(`Host Restarted`);
    } catch (error) {
      if (error instanceof ApplicationError) {
        toast.error(`Restart Failed with: ${error.message}`);
      }
    }
  };
  const handleStopHost = async () => {
    try {
      await stopHost(queryAsString(id));
      toast.success(`Host Stopped`);
    } catch (error) {
      if (error instanceof ApplicationError) {
        toast.error(`Stop Failed with: ${error.message}`);
      }
    }
  };
  const handleDelete = async () => {
    try {
      await deleteHost(queryAsString(id));
      toast.success(`Host Deleted`);
    } catch (error) {
      if (error instanceof ApplicationError) {
        toast.error(`Delete Failed with: ${error.message}`);
      }
    }
  };

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
    getHostById(queryAsString(id));
  }, [id]);

  const hostRow = nodeListToRow(host, handleStopNode, handleRestartNode);

  const hostDetails = getHostDetails(host);

  if (!isMounted) return null;

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        {!loading ? (
          <>
            <DetailsHeader
              title={host?.name ?? ''}
              ip={host?.ip ?? ''}
              status={<HostStatus status={host?.status ?? 0} />}
              location={host?.location}
              handleRestart={handleRestartHost}
              handleStop={handleStopHost}
            />
            {/* <HostCharts /> */}
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
          isLoading={loading}
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
