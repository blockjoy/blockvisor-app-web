import {
  NodeJob,
  NodeJobStatus,
  NodeStatus,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { NODE_PROGRESS_STATUSES } from '../constants/nodeState';

export const getNodeJobProgress = (jobs: NodeJob[]) =>
  jobs?.find(
    (job) =>
      job.status === NodeJobStatus.NODE_JOB_STATUS_RUNNING &&
      job.progress?.current! > -1 &&
      job.progress?.current !== job.progress?.total,
  )?.progress;

export const checkIfNodeInProgress = (nodeStatus?: NodeStatus) => {
  const nodeState = nodeStatus?.state;
  const protocolState = nodeStatus?.protocol?.state;

  return Boolean(
    nodeState &&
      protocolState &&
      NODE_PROGRESS_STATUSES.includes(protocolState.toLowerCase()),
  );
};
