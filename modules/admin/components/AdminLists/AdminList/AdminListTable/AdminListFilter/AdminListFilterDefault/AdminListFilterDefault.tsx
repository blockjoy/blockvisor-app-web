import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  items: AdminFilterDropdownItem[];
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterDefault = ({ items, values, onChange }: Props) => {
  return (
    <AdminListFilterControl items={items} values={values} onChange={onChange} />
  );
};
