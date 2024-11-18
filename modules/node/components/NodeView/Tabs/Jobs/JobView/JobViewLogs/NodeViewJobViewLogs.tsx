import { NodeJob } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Alert, Log, LogsWrapper } from '@shared/components';

export const NodeViewJobViewLogs = ({ job }: { job: NodeJob }) => {
  return job.logs.length ? (
    <LogsWrapper>
      {job.logs.map((job) => (
        <Log>{job}</Log>
      ))}
    </LogsWrapper>
  ) : (
    <Alert>No logs</Alert>
  );
};
