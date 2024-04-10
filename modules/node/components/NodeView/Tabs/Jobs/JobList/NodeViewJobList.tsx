import { useRouter } from 'next/router';
import { NodeJobStatus } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { styles } from './NodeViewJobList.styles';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { EmptyColumn, sort, Table } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { convertNodeJobStatusToName } from '@modules/node/utils/convertNodeJobStatusToName';
import { spacing } from 'styles/utils.spacing.styles';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

export const NodeViewJobList = () => {
  const { node } = useNodeView();

  const router = useRouter();

  const headers: TableHeader[] = [
    {
      key: '1',
      name: 'Name',
    },
    {
      key: '2',
      name: 'Status',
    },
    {
      key: '3',
      name: 'Progress',
    },
  ];

  const rows = node?.jobs.map((job) => ({
    key: job.name,
    cells: [
      {
        key: '1',
        component: <p>{job.name}</p>,
      },
      {
        key: '2',
        component: (
          <p
            css={[
              styles.status,
              job.status === NodeJobStatus.NODE_JOB_STATUS_RUNNING &&
                styles.statusSuccess,
            ]}
          >
            {convertNodeJobStatusToName(job.status)}
          </p>
        ),
      },
      {
        key: '3',
        component: (
          <p css={styles.progress}>
            {job.status === NodeJobStatus.NODE_JOB_STATUS_FINISHED ||
            !job?.progress
              ? ''
              : `${
                  Math.round(
                    (job?.progress?.current! / job?.progress?.total!) * 100,
                  ) || 0
                }% Complete`}
          </p>
        ),
      },
    ],
  }));

  const sortedRows = sort(rows, {
    field: 'key',
    order: SortOrder.SORT_ORDER_ASCENDING,
  });

  const handleRowClicked = (name: string) => {
    router.push({
      pathname: ROUTES.NODE_JOB(node?.id!, name),
    });
  };

  return sortedRows.length ? (
    <section css={[styles.wrapper, spacing.top.small]}>
      <Table
        isLoading="finished"
        headers={headers}
        rows={sortedRows}
        verticalAlign="middle"
        fixedRowHeight="72px"
        onRowClick={handleRowClicked}
      />
    </section>
  ) : (
    <EmptyColumn
      title="No Jobs"
      description="When your node has jobs, they will be shown here."
    />
  );
};
