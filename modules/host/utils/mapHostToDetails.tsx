import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { HostOs } from '@shared/components';
import Link from 'next/link';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { dateFormatter, timeFormatter } from '@shared/utils/dateFormatter';

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
          <ul>
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
      data: formatters.formatBytes(host?.memSizeBytes!) || '-',
    },
    {
      label: 'Disk Size',
      data: formatters.formatBytes(host?.diskSizeBytes!) || '-',
    },
  ];

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
        : `${dateFormatter.format(host.createdAt)} @ ${timeFormatter.format(
            host.createdAt,
          )}`,
    },
  ];

  return details;
};
