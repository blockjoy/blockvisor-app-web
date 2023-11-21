import Link from 'next/link';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { HostOs, sort } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { usePermissions } from '@modules/auth/hooks/usePermissions';

const ipListStyles = css`
  columns: 2;

  @media ${breakpoints.fromSml} {
    columns: 2;
  }

  @media ${breakpoints.fromMed} {
    columns: 1;
  }

  @media ${breakpoints.fromXHuge} {
    columns: 3;
  }
`;

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
      label: 'IP Addresses',
      data: host.ipAddresses?.length ? (
        <ul css={ipListStyles}>
          {sort(host.ipAddresses, { field: 'ip', order: 'asc' }).map(
            ({ ip }) => (
              <li key={ip} css={spacing.bottom.micro}>
                {ip}
              </li>
            ),
          )}
        </ul>
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
      data: <Link href={ROUTES.ORGANIZATION(host.orgId)}>{host.orgName}</Link>,
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
