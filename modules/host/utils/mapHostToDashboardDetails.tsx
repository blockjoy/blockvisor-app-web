import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { HostOs } from '@shared/components';

export const mapHostToDashboardDetails = (host: Host) => {
  const details: { label: string; data: any | undefined }[] = [
    { label: 'VERSION', data: host?.version || '-' },
    {
      label: 'OS',
      data: <HostOs os={host.os} osVersion={host.osVersion} /> || '-',
    },
  ];

  return details;
};
