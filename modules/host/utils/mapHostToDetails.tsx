import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { HostIps, HostOs, NextLink } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { usePermissions } from '@modules/auth/hooks/usePermissions';

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
      data: host?.ipAddresses.filter((ip) => !ip.assigned).length,
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
      data: !host.createdAt
        ? '-'
        : `${formatters.formatDate(host.createdAt)} @ ${formatters.formatDate(
            host.createdAt,
            'time',
          )}`,
    },
  ];

  return details;
};
