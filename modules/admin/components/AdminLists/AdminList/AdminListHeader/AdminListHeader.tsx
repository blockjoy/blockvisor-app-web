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
};

export const AdminListHeader = ({
  name,
  columnsState,
  onColumnsChanged,
  onSearch,
}: Props) => {
  return (
    <AdminHeader name={name}>
      <AdminSearch onSearch={onSearch} placeholder="Quick search" />
      <div css={styles.buttons}>
        <AdminHeaderButton
          isDisabled
          icon={<IconRefresh />}
          onClick={() => console.log('refresh')}
        />
        <AdminHeaderButton
          isDisabled
          icon={<IconFilter />}
          onClick={() => console.log('filter')}
        />
        <AdminListHeaderColumnPicker
          columnsState={columnsState}
          onColumnsChanged={onColumnsChanged}
        />
      </div>
    </AdminHeader>
  );
};
