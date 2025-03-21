import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import { DropdownMenu, SvgIcon, BadgeCircle, Button } from '@shared/components';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './AdminListFilter.styles';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import IconFilter from '@public/assets/icons/common/Filter.svg';

type Props = {
  column: AdminListColumn;
  scrollX: number;
  headerRef: RefObject<HTMLSpanElement>;
  listAll: any[];
  protocols?: Protocol[];
  users?: User[];
  onFilterChange: (item: AdminFilterDropdownItem) => void;
  onReset: (columnName: string) => void;
};

export const AdminListFilter = ({
  column,
  headerRef,
  listAll,
  protocols,
  users,
  scrollX,
  onFilterChange,
  onReset,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState<string>();
  const [menuLeft, setMenuLeft] = useState<string>();
  const [minWidth, setMinWidth] = useState<string>();
  const [maxWidth, setMaxWidth] = useState<string>();

  const setMenuPosition = () => {
    const rect = headerRef.current?.getBoundingClientRect();
    const top = rect?.top! + 44;
    const left = rect?.left!;
    const minWidth = column?.filterDropdownMinWidth || -1;
    const maxWidth =
      column?.filterDropdownMaxWidth ||
      Math.max(minWidth, headerRef.current?.clientWidth!);

    setMenuLeft(`${left! - 10}px`);
    setMenuTop(`${top}px`);
    setMaxWidth(`${maxWidth! + 10}px`);
    setMinWidth(minWidth > -1 ? `${minWidth}px` : 'auto');
  };

  const handleReset = () => {
    setIsOpen(false);
    onReset(column.name);
  };

  const handleOpen = () => {
    setMenuPosition();
    setIsOpen(true);
  };

  const handleClickOutside = () => setIsOpen(false);

  const hasFilters = Boolean(column?.filterSettings?.values?.length);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  useEffect(() => {
    setMenuPosition();
  }, [scrollX]);

  useLayoutEffect(() => {
    window.addEventListener('resize', () => handleClickOutside);
    return () => window.removeEventListener('resize', handleClickOutside);
  }, []);

  const FilterControls = column.filterComponent!;

  const dropdownMenu = (
    <DropdownMenu
      dropdownMenuRef={dropdownRef}
      isOpen={isOpen}
      additionalStyles={css`
        position: fixed;
        top: ${menuTop};
        left: ${menuLeft};
        right: auto;
        overflow: visible;
        max-width: ${maxWidth};
        min-width: ${minWidth};
      `}
    >
      <FilterControls
        listAll={listAll}
        protocols={protocols}
        users={users}
        isOpen={isOpen}
        columnName={column.name}
        onFilterChange={onFilterChange}
        onReset={onReset}
        items={column?.filterSettings?.items}
        values={column?.filterSettings?.values}
      />
      <div css={styles.resetButtonWrapper}>
        <Button
          disabled={!hasFilters}
          onClick={handleReset}
          style="outline"
          size="small"
          display="block"
        >
          Reset
        </Button>
      </div>
    </DropdownMenu>
  );

  const overlay = (
    <div css={[styles.overlay, isOpen && styles.overlayVisible]} />
  );

  return (
    <>
      {createPortal(overlay, document.body)}
      <div css={styles.outerWrapper}>
        <div css={styles.wrapper}>
          <button
            css={styles.dropdownButton}
            type="button"
            onClick={handleOpen}
          >
            <SvgIcon size="12px" isDefaultColor>
              <IconFilter />
            </SvgIcon>
            {Boolean(column?.filterSettings?.values?.length) && (
              <BadgeCircle>
                {column?.filterSettings?.values?.length}
              </BadgeCircle>
            )}
          </button>
          {createPortal(dropdownMenu, document.body)}
        </div>
      </div>
    </>
  );
};
