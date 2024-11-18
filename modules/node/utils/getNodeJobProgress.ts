import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeJobStatus } from '@modules/grpc/library/blockjoy/common/v1/node';

export const getNodeJobProgress = (node: Node) =>
  node.jobs.find(
    (job) =>
      job.status === NodeJobStatus.NODE_JOB_STATUS_RUNNING &&
      job.progress?.current! > -1 &&
      job.progress?.current !== job.progress?.total,
  )?.progress;
