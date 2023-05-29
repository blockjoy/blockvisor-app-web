import { Host } from '@modules/grpc/library/blockjoy/v1/host';

export const mapHostToDetails = (host: Host) => {
  const details: { label: string; data: any | undefined }[] = [
    { label: 'VERSION', data: host?.version || '-' },
    { label: 'OS', data: host?.os || '-' },
    { label: 'OS VERSION', data: host?.osVersion || '-' },
    { label: 'IP ADDRESS', data: host?.ip || '-' },
    { label: 'CPU COUNT', data: host?.cpuCount || '-' },
    { label: 'MEMORY', data: host?.memSizeBytes || '-' },
    { label: 'DISK SIZE', data: host?.diskSizeBytes || '-' },
  ];

  return details;
};
