import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { formatters } from '@shared/utils/formatters';
import { HostOs } from '@shared/components';

export const mapHostToDetails = (host: Host) => {
  const details: { label: string; data: any | undefined }[] = [
    { label: 'VERSION', data: host?.version || '-' },
    {
      label: 'OS',
      data: <HostOs os={host.os} osVersion={host.osVersion} /> || '-',
    },
    { label: 'IP ADDRESS', data: host?.ip || '-' },
    {
      label: 'CPU COUNT',
      data:
        `${host?.cpuCount} Core${host?.cpuCount && host.cpuCount > 1 && 's'}` ||
        '-',
    },
    {
      label: 'MEMORY',
      data: formatters.formatBytes(host?.memSizeBytes!) || '-',
    },
    {
      label: 'DISK SIZE',
      data: formatters.formatBytes(host?.diskSizeBytes!) || '-',
    },
  ];

  return details;
};
