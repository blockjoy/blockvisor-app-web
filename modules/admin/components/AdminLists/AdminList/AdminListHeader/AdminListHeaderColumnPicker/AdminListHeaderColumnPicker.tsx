import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import { capitalized } from '@modules/admin/utils/capitalized';
import { Checkbox, DropdownMenu, Scrollbar } from '@shared/components';
import { useRef, useState } from 'react';
import { styles } from './AdminListHeaderColumnPicker.styles';
import { css } from '@emotion/react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import IconColumns from '@public/assets/icons/common/Columns.svg';

type Props = {
  columnsState: AdminListColumn[];
  onColumnsChanged: (nextColumns: AdminListColumn[]) => void;
};

export const AdminListHeaderColumnPicker = ({
  columnsState,
  onColumnsChanged,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleColumnToggled = (columnName: string) => {
    const columnsStateCopy = [...columnsState];

    const foundColumn = columnsStateCopy.find(
      (column) => column.name === columnName,
    );

    if (!foundColumn) return;

    foundColumn.isVisible = !foundColumn?.isVisible;

    if (!columnsStateCopy.some((column) => column.isVisible)) return;

    onColumnsChanged(columnsStateCopy);
  };

  const handleClickOutside = () => setIsOpen(false);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        icon={<IconColumns />}
        onClick={() => setIsOpen(!isOpen)}
      />
      <DropdownMenu
        isOpen={isOpen}
        additionalStyles={css`
          left: auto;
          right: 0;
          top: 54px;
          min-width: max-content;
          overflow: visible;
        `}
      >
        <h2 css={styles.title}>Columns</h2>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          {columnsState.map((column) => (
            <div key={column.name} css={styles.item}>
              <Checkbox
                id={column.name}
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
              </Checkbox>
            </div>
          ))}
        </Scrollbar>
      </DropdownMenu>
    </div>
  );
};
