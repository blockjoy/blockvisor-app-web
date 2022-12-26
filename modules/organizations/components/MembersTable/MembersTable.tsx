import { Table } from '@shared/components';

type Props = {
  isLoading: LoadingState;
  rows?: Row[];
};

const headers: TableHeader[] = [
  {
    name: 'Username',
    key: '1',
  },
  {
    name: 'Role',
    key: '2',
  },
];

export function MembersTable({ isLoading, rows }: Props) {
  return <Table isLoading={isLoading} headers={headers} rows={rows} />;
}
