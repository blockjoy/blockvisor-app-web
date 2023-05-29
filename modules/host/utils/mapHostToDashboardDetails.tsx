import { Host } from '@modules/grpc/library/blockjoy/v1/host';

export const mapHostToDashboardDetails = (host: Host) => {
  const details: { label: string; data: any | undefined }[] = [
    { label: 'VERSION', data: host?.version || '-' },
    { label: 'OS', data: host?.os || '-' },
    { label: 'OS VERSION', data: host?.osVersion || '-' },
  ];

  return details;
};
