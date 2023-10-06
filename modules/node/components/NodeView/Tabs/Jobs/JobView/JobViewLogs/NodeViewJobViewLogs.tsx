import { NodeJob } from '@modules/grpc/library/blockjoy/v1/node';
import { Table } from '@shared/components';
import { css } from '@emotion/react';

const styles = {
  log: css`
    line-height: 1.65;
  `,
};

export const NodeViewJobViewLogs = ({ job }: { job: NodeJob }) => {
  const rows = job.logs.map((log, index) => ({
    key: `row-${index}`,
    cells: [
      {
        key: '1',
        component: <p css={styles.log}>{log}</p>,
      },
    ],
  }));

  return job.logs.length ? (
    <Table isLoading={'finished'} rows={rows} />
  ) : (
    <p>No logs</p>
  );
};
