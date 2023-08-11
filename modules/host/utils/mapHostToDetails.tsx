import Link from 'next/link';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { HostOs } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

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

const generateIpAddresses = (host: Host) => {
  const ips = [];
  try {
    const from = +host?.ipRangeFrom?.split('.')[3]!,
      to = +host?.ipRangeTo?.split('.')[3]!;

    for (let i = from; i < to; i++)
      ips.push(
        `${host?.ipRangeFrom?.substring(
          0,
          host?.ipRangeFrom?.lastIndexOf('.')!,
        )!}.${i}`,
      );
  } catch (err) {
    console.log('generateIpAddressesError:', err);
  } finally {
    return ips;
  }
};

export const mapHostToDetails = (host: Host) => {
  const ipAddresses = generateIpAddresses(host);

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
      data:
        (
          <ul css={ipListStyles}>
            {ipAddresses.map((ip) => (
              <li key={ip} css={spacing.bottom.micro}>
                {ip}
              </li>
            ))}
          </ul>
        ) || '-',
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
