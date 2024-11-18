import { NodeJobStatus } from '@modules/grpc/library/blockjoy/common/v1/node';

export const convertNodeJobStatusToName = (status: NodeJobStatus) =>
  NodeJobStatus[status]?.replace('NODE_JOB_STATUS_', '').toLowerCase() ||
  'Unknown';
