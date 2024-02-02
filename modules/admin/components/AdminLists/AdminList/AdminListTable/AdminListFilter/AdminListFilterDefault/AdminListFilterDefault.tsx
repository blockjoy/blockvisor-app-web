import { AdminListFilterControl } from '../AdminListFilterDropdown/AdminListFilterControl';

type Props = {
  items: AdminFilterDropdownItem[];
  filterSettings: AdminListColumnFilterSettings;
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterDefault = ({
  items,
  filterSettings,
  onChange,
}: Props) => {
  return (
    <AdminListFilterControl
      items={items}
      filterSettings={filterSettings}
      onChange={onChange}
    />
  );
};
