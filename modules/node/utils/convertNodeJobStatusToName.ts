import { NodeJobStatus } from '@modules/grpc/library/blockjoy/v1/node';

export const convertNodeJobStatusToName = (status: NodeJobStatus) =>
  NodeJobStatus[status]?.replace('NODE_JOB_STATUS_', '').toLowerCase() ||
  'Unknown';
