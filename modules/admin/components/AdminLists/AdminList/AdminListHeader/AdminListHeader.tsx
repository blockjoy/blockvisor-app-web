import { AdminHeader } from '@modules/admin/components/AdminHeader/AdminHeader';
import { AdminListHeaderColumnPicker } from './AdminListHeaderColumnPicker/AdminListHeaderColumnPicker';
import { styles } from './AdminListHeader.styles';
import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import { BadgeCircle, Search } from '@shared/components';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import IconFilterClear from '@public/assets/icons/common/FilterClear.svg';

type Props = {
  name: string;
  columns: AdminListColumn[];
  onColumnsChanged: (nextColumns: AdminListColumn[]) => void;
  onFiltersChanged: (nextFilters: AdminListColumn[]) => void;
  onSearch: (search: string) => void;
};

export const AdminListHeader = ({
  name,
  columns,
  onColumnsChanged,
  onFiltersChanged,
  onSearch,
}: Props) => {
  const handleResetFilters = () => {
    const filtersCopy = [...columns.filter((column) => column.filterSettings)];

    for (let column of filtersCopy) {
      if (column.filterSettings) {
        column.filterSettings.values = [];
      }
    }

    onFiltersChanged(filtersCopy);
  };

  const filterCount = columns.filter(
    (column) => !!column.filterSettings?.values?.length,
  )?.length;

  const hasFilterColumns = columns.some((column) => column.filterSettings);

  return (
    <AdminHeader name={name}>
      <Search
        version="instant"
        onSearch={onSearch}
        placeholder="Quick search"
      />
      <div css={styles.buttons}>
        <AdminListHeaderColumnPicker
          columns={columns}
          onColumnsChanged={onColumnsChanged}
        />
        {hasFilterColumns && (
          <AdminHeaderButton
            isDisabled={filterCount === 0}
            icon={<IconFilterClear />}
            onClick={handleResetFilters}
            tooltip="Reset Filters"
          >
            {filterCount > 0 && (
              <BadgeCircle additionalStyles={styles.badge}>
                {filterCount}
              </BadgeCircle>
            )}
          </AdminHeaderButton>
        )}
      </div>
    </AdminHeader>
  );
};
