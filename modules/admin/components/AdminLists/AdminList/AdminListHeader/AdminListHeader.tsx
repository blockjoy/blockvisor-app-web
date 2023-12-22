import { AdminHeader } from '@modules/admin/components/AdminHeader/AdminHeader';
import { AdminSearch } from '@modules/admin/components/AdminSearch/AdminSearch';
import { AdminListHeaderColumnPicker } from './AdminListHeaderColumnPicker/AdminListHeaderColumnPicker';
import { styles } from './AdminListHeader.styles';
import { AdminIconButton } from '@modules/admin/components/AdminIconButton/AdminIconButton';
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
        <AdminIconButton
          isDisabled
          icon={<IconRefresh />}
          onClick={() => console.log('refresh')}
        />
        <AdminIconButton
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
