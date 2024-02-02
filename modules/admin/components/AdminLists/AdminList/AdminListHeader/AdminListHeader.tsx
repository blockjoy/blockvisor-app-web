import { AdminHeader } from '@modules/admin/components/AdminHeader/AdminHeader';
import { AdminSearch } from '@modules/admin/components/AdminSearch/AdminSearch';
import { AdminListHeaderColumnPicker } from './AdminListHeaderColumnPicker/AdminListHeaderColumnPicker';
import { styles } from './AdminListHeader.styles';
import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import IconFilter from '@public/assets/icons/common/Filter.svg';

type Props = {
  name: string;
  columnsState: AdminListColumn[];
  onColumnsChanged: (nextColumns: AdminListColumn[]) => void;
  onSearch: (search: string) => void;
  onFiltersChanged: (filters: AdminListColumn[]) => void;
  onFiltersApplied: VoidFunction;
};

export const AdminListHeader = ({
  name,
  columnsState,
  onColumnsChanged,
  onSearch,
  onFiltersChanged,
  onFiltersApplied,
}: Props) => {
  const handleResetFilters = () => {
    const columnsStateCopy = [...columnsState];

    for (let column of columnsStateCopy) {
      if (column.filterSettings) {
        column.filterSettings.values = [];
      }
    }

    onFiltersChanged(columnsStateCopy);
    onFiltersApplied();
  };

  return (
    <AdminHeader name={name}>
      <AdminSearch onSearch={onSearch} placeholder="Quick search" />
      <div css={styles.buttons}>
        <AdminHeaderButton icon={<IconRefresh />} onClick={handleResetFilters}>
          Reset Filters
        </AdminHeaderButton>
        <AdminListHeaderColumnPicker
          columnsState={columnsState}
          onColumnsChanged={onColumnsChanged}
        />
      </div>
    </AdminHeader>
  );
};
