import { styles } from './NodeViewJobList.styles';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { sort, Table } from '@shared/components';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { convertNodeJobStatusToName } from '@modules/node/utils/convertNodeJobStatusToName';
import { NodeJobStatus } from '@modules/grpc/library/blockjoy/v1/node';
import { spacing } from 'styles/utils.spacing.styles';

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
              job.status === NodeJobStatus.NODE_JOB_STATUS_FINISHED &&
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
          <p>
            {job.status === NodeJobStatus.NODE_JOB_STATUS_FINISHED
              ? ''
              : `${
                  Math.round(
                    (job?.progress?.current! / job?.progress?.total!) * 100,
                  ) || 0
                }%`}
          </p>
        ),
      },
    ],
  }));

  const sortedRows = sort(rows, { field: 'name', order: 'asc' });

  const handleRowClicked = (name: string) => {
    router.push({
      pathname: ROUTES.NODE_JOB(node?.id!, name),
    });
  };

  return (
    <section css={spacing.top.medium}>
      <Table
        isLoading="finished"
        headers={headers}
        rows={sortedRows}
        verticalAlign="middle"
        fixedRowHeight="74px"
        onRowClick={handleRowClicked}
      />
    </section>
  );
};
