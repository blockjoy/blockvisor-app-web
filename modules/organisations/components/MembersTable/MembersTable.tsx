import { Table } from '@modules/app/components/shared';

type Props = {
  isLoading: boolean;
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
