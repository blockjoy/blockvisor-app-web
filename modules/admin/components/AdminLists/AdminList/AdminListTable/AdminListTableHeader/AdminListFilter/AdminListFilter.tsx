import { css } from '@emotion/react';
import { DropdownMenu, SvgIcon, BadgeCircle, Button } from '@shared/components';
import {
  MouseEvent,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './AdminListFilter.styles';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import IconFilter from '@public/assets/icons/common/Filter.svg';

type Props = {
  column: AdminListColumn;
  tableScrollPosition: number;
  headerRef: RefObject<HTMLSpanElement>;
  listAll: any[];
  blockchains?: Blockchain[];
  onFilterChange: (item: AdminFilterDropdownItem) => void;
  onReset: (columnName: string) => void;
};

export const AdminListFilter = ({
  column,
  tableScrollPosition,
  headerRef,
  listAll,
  blockchains,
  onFilterChange,
  onReset,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState<string>();
  const [menuLeft, setMenuLeft] = useState<string>();
  const [maxWidth, setMaxWidth] = useState<string>();

  const setMenuPosition = () => {
    const rect = headerRef.current?.getBoundingClientRect();
    const top = rect?.top! + 50;
    const left = rect?.left!;
    const maxWidth = headerRef.current?.clientWidth;
    setMenuLeft(`${left - 10!}px`);
    setMenuTop(`${top}px`);
    setMaxWidth(`${maxWidth! + 1}px`);
  };

  const toggleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuPosition();
    setIsOpen(!isOpen);
  };

  const handleReset = () => {
    setIsOpen(false);
    onReset(column.name);
  };

  const handleClickOutside = () => setIsOpen(false);

  const hasFilters = Boolean(column?.filterSettings?.values?.length);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  useEffect(() => {
    setMenuPosition();
  }, []);

  useEffect(() => {
    handleClickOutside();
    setMenuPosition();
  }, [tableScrollPosition]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleClickOutside);
    return () => window.removeEventListener('resize', handleClickOutside);
  }, []);

  const FilterControls = column.filterComponent!;

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <button css={styles.dropdownButton} type="button" onClick={toggleOpen}>
        <SvgIcon size="12px" isDefaultColor>
          <IconFilter />
        </SvgIcon>
        {Boolean(column?.filterSettings?.values?.length) && (
          <BadgeCircle>{column?.filterSettings?.values?.length}</BadgeCircle>
        )}
      </button>
      <DropdownMenu
        isOpen={isOpen}
        additionalStyles={css`
          position: fixed;
          top: ${menuTop};
          left: ${menuLeft};
          right: auto;
          overflow: visible;
          max-width: ${maxWidth};
          width: ${maxWidth};
          min-width: ${maxWidth};
        `}
      >
        <FilterControls
          listAll={listAll}
          blockchains={blockchains}
          isOpen={isOpen}
          columnName={column.name}
          onFilterChange={onFilterChange}
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
    </div>
  );
};
