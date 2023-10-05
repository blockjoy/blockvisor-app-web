import { styles } from './NodeViewJobList.styles';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { Table } from '@shared/components';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';

export const NodeViewJobList = () => {
  const { node } = useNodeView();

  const router = useRouter();

  const rows = node?.jobs.map((job) => ({
    key: job.name,
    cells: [
      {
        key: '1',
        component: <p>{job.name}</p>,
        data: 'test',
      },
    ],
  }));

  const headers: TableHeader[] = [
    {
      key: '1',
      name: 'Name',
    },
  ];

  const handleRowClicked = (name: string) => {
    router.push({
      pathname: ROUTES.NODE_JOB(node?.id!, name),
    });
  };

  return (
    <Table
      isLoading="finished"
      headers={headers}
      rows={rows}
      verticalAlign="middle"
      fixedRowHeight="74px"
      onRowClick={handleRowClicked}
    />
  );
};
