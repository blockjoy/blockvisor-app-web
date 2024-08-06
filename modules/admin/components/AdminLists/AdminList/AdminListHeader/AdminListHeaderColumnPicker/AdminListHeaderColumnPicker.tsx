import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import { capitalized } from '@modules/admin/utils/capitalized';
import { Checkbox, DropdownMenu, Scrollbar, SvgIcon } from '@shared/components';
import { useRef, useState } from 'react';
import { styles } from './AdminListHeaderColumnPicker.styles';
import { css } from '@emotion/react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { AdminDropdownHeader } from '@modules/admin/components';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import IconColumns from '@public/assets/icons/common/Table.svg';
import IconFilter from '@public/assets/icons/common/Filter.svg';

type Props = {
  columns: AdminListColumn[];
  onColumnsChanged: (nextColumns: AdminListColumn[]) => void;
};

export const AdminListHeaderColumnPicker = ({
  columns,
  onColumnsChanged,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleColumnToggled = (columnName: string) => {
    const nextColumns = columns.map((column) =>
      column.name === columnName
        ? { ...column, isVisible: !column.isVisible }
        : column,
    );
    onColumnsChanged(nextColumns);
  };

  const handleClickOutside = () => setIsOpen(false);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        icon={<IconColumns />}
        onClick={() => setIsOpen(!isOpen)}
        tooltip="Change Columns"
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={[styles.dropdownMenu]}>
        <AdminDropdownHeader onClose={handleClickOutside}>
          Columns
        </AdminDropdownHeader>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          {columns?.map((column) => {
            const isDisabled = column.filterSettings?.values?.length! > 0;
            return (
              <div key={column.name} css={styles.item}>
                <Checkbox
                  id={`column_${column.name}`}
                  disabled={isDisabled}
                  checked={column.isVisible}
                  name={column.name}
                  onChange={() => handleColumnToggled(column.name)}
                  additionalStyles={[
                    css`
                      flex: 1 1 auto;
                      padding: 6px 52px 6px 0;
                    `,
                  ]}
                >
                  {capitalized(column.displayName || column.name)}
                  {column.isVisible}
                  {isDisabled && (
                    <SvgIcon size="12px" isDefaultColor>
                      <IconFilter />
                    </SvgIcon>
                  )}
                </Checkbox>
              </div>
            );
          })}
        </Scrollbar>
      </DropdownMenu>
    </div>
  );
};
