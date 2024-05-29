import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const getNodeJobProgress = (node: Node) =>
  node.jobs.find(
    (job) =>
      job.progress?.current! > -1 &&
      job.progress?.current !== job.progress?.total,
  )?.progress;
