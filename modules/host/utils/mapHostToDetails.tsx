import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import {
  DateTime,
  HostIps,
  HostIpStatus,
  HostManagedBy,
  HostOs,
  NextLink,
} from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import { spacing } from 'styles/utils.spacing.styles';

export const mapHostToDetails = (host: Host) => {
  const { isSuperUser } = usePermissions();

  const details: { label: string; data: any | undefined }[] = [
    { label: 'Version', data: host?.version || '-' },
    {
      label: 'OS',
      data: <HostOs os={host.os} osVersion={host.osVersion} /> || '-',
    },
    { label: 'IP Address', data: host?.ip || '-' },
    { label: 'Gateway IP', data: host?.ipGateway || '-' },
    {
      label: `Available IP's`,
      data: (
        <div css={spacing.bottom.micro}>
          <HostIpStatus ipAddresses={host.ipAddresses} />{' '}
        </div>
      ),
    },
    {
      label: 'IP Addresses',
      data: host.ipAddresses?.length ? (
        <HostIps ipAddresses={host.ipAddresses} orgId={host.orgId} />
      ) : (
        '-'
      ),
    },
    {
      label: 'CPU Count',
      data:
        `${host?.cpuCount} Core${host?.cpuCount && host.cpuCount > 1 && 's'}` ||
        '-',
    },
    {
      label: 'Memory',
      data: formatters.formatSize(host?.memSizeBytes!, 'bytes') || '-',
    },
    {
      label: 'Disk Size',
      data: formatters.formatSize(host?.diskSizeBytes!, 'bytes') || '-',
    },
  ];

  if (isSuperUser) {
    details.unshift({
      label: 'Nodes',
      data: host.nodeCount,
    });
  }

  if (host?.billingAmount)
    details.push({
      label: 'Monthly Cost',
      data:
        formatters.formatAmount(host?.billingAmount?.amount!, 'amount') || '-',
    });

  return details;
};

export const mapHostToDetailsLaunch = (host: Host) => {
  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'Organization',
      data: (
        <NextLink href={ROUTES.ORGANIZATION(host.orgId)}>
          {host.orgName}
        </NextLink>
      ),
    },
    {
      label: 'Launched On',
      data: !host.createdAt ? '-' : <DateTime date={host.createdAt} />,
    },
    {
      label: 'Managed By',
      data: <HostManagedBy managedBy={host.managedBy} />,
    },
  ];

  return details;
};
