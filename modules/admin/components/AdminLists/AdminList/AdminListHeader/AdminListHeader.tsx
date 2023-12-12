import { AdminHeader } from '@modules/admin/components/AdminHeader/AdminHeader';
import { AdminSearch } from '@modules/admin/components/AdminSearch/AdminSearch';

type Props = {
  name: string;
  onSearch: (search: string) => void;
};

export const AdminListHeader = ({ name, onSearch }: Props) => {
  return (
    <AdminHeader name={name}>
      <AdminSearch
        onSearch={onSearch}
        hideSearchButton
        placeholder="Quick search"
      />
    </AdminHeader>
  );
};
