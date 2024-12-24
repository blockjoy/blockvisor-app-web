import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  NodeJob,
  NodeJobStatus,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { EmptyColumn, sort as sortItems, Table } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { Sort } from '@shared/common/common';
import { nodeAtoms } from '@modules/node';
import { convertNodeJobStatusToName } from '@modules/node/utils/convertNodeJobStatusToName';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './NodeViewJobList.styles';

const headers: TableHeader<keyof NodeJob>[] = [
  {
    key: 'name',
    name: 'Name',
    dataField: 'name',
  },
  {
    key: 'status',
    name: 'Status',
    dataField: 'status',
  },
  {
    key: 'progress',
    name: 'Progress',
    dataField: 'progress',
  },
];

export const NodeViewJobList = () => {
  const router = useRouter();

  const node = useRecoilValue(nodeAtoms.activeNode);

  const [jobs, setJobs] = useState<NodeJob[]>(node?.jobs ?? []);
  const [sort, setSort] = useState<Sort<keyof NodeJob>[]>([
    {
      field: 'name',
      order: SortOrder.SORT_ORDER_ASCENDING,
    },
  ]);

  useEffect(() => {
    const sortedJobs = sortItems(jobs, sort?.[0]);

    setJobs(sortedJobs);
  }, [sort[0].field, sort[0].order]);

  const rows: TableRow<string, keyof NodeJob>[] = jobs.map((job) => ({
    key: job.name,
    cells: [
      {
        key: 'name',
        component: <p>{job.name}</p>,
      },
      {
        key: 'status',
        component: (
          <p
            css={[
              styles.status,
              job.status === NodeJobStatus.NODE_JOB_STATUS_RUNNING
                ? styles.statusSuccess
                : job.status === NodeJobStatus.NODE_JOB_STATUS_FAILED
                ? styles.statusError
                : null,
            ]}
          >
            {convertNodeJobStatusToName(job.status)}
          </p>
        ),
      },
      {
        key: 'progress',
        component: (
          <p css={styles.progress}>
            {job.status === NodeJobStatus.NODE_JOB_STATUS_FINISHED ||
            !job?.progress
              ? ''
              : `${
                  (
                    (job?.progress?.current! / job?.progress?.total!) *
                    100
                  ).toFixed(2) || 0
                }% Complete`}
          </p>
        ),
      },
    ],
  }));

  const handleRowClicked = (name: string) => {
    router.push({
      pathname: ROUTES.NODE_JOB(node?.nodeId!, name),
    });
  };

  const handleHeaderClicked = (field: string) => {
    const order =
      sort?.[0]?.order === SortOrder.SORT_ORDER_ASCENDING
        ? SortOrder.SORT_ORDER_DESCENDING
        : SortOrder.SORT_ORDER_ASCENDING;

    setSort([
      {
        field: field as keyof NodeJob,
        order,
      },
    ]);
  };

  return rows.length ? (
    <section css={[styles.wrapper, spacing.top.small]}>
      <Table
        isLoading="finished"
        headers={headers}
        rows={rows}
        verticalAlign="middle"
        fixedRowHeight="72px"
        onRowClick={handleRowClicked}
        sort={sort}
        handleSort={handleHeaderClicked}
      />
    </section>
  ) : (
    <EmptyColumn
      title="No Jobs"
      description="When your node has jobs, they will be shown here."
    />
  );
};
