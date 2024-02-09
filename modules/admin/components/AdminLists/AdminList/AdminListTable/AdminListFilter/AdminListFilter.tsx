import { AdminListFilterBlockchain } from './AdminListFilterBlockchain/AdminListFilterBlockchain';
import { AdminListFilterDefault } from './AdminListFilterDefault/AdminListFilterDefault';
import { Button, DropdownMenu, Scrollbar, SvgIcon } from '@shared/components';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './AdminListFilter.styles';
import { css } from '@emotion/react';
import { AdminDropdownHeader } from '@modules/admin/components';
import IconFilter from '@public/assets/icons/common/Filter.svg';

type Props = {
  filterSettings: AdminListColumnFilterSettings;
  filters: AdminListColumn[];
  tableScrollPosition: number;
  onChange: (filters: AdminListColumn[]) => void;
};

export const AdminListFilter = ({
  filterSettings,
  filters,
  tableScrollPosition,
  onChange,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState<string>();
  const [menuRight, setMenuRight] = useState<string>();

  const handleChange = (item: AdminFilterDropdownItem) => {
    let valuesCopy = filterSettings?.values ? [...filterSettings.values] : [];

    const valueExists = valuesCopy?.some((value) => value === item.id);

    if (valueExists) {
      valuesCopy = valuesCopy.filter((v) => v !== item.id)!;
    } else {
      valuesCopy.push(item.id);
    }

    const filtersStateCopy = [...filters];

    const foundFilter = filtersStateCopy.find(
      (column) => column.filterSettings?.name === filterSettings.name,
    );

    if (!foundFilter || !foundFilter?.filterSettings) return;

    foundFilter.filterSettings.values = valuesCopy;

    onChange(filtersStateCopy);
  };

  const handleReset = () => {
    setIsOpen(false);

    const filtersCopy = [...filters];

    const foundFilter = filtersCopy.find(
      (f) => f.filterSettings?.type === filterSettings.type,
    );

    if (!foundFilter || !foundFilter.filterSettings) return;

    foundFilter.filterSettings.values = [];

    onChange(filtersCopy);
  };

  const hasFilters = Boolean(filterSettings.values?.length);

  const controls = {
    blockchain: (
      <AdminListFilterBlockchain
        onChange={handleChange}
        values={filterSettings.values}
      />
    ),
    default: (
      <AdminListFilterDefault
        items={filterSettings.dropdownItems!}
        onChange={handleChange}
        values={filterSettings.values}
      />
    ),
  };

  const setMenuPosition = () => {
    const rect = dropdownRef.current?.getBoundingClientRect();
    const top = rect?.top! + 42;
    const right = window.innerWidth - rect?.right!;
    setMenuRight(`${right!}px`);
    setMenuTop(`${top}px`);
  };

  const toggleOpen = () => {
    setMenuPosition();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

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

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <button css={styles.dropdownButton} type="button" onClick={toggleOpen}>
        <SvgIcon size="12px" isDefaultColor>
          <IconFilter />
        </SvgIcon>
        {Boolean(filterSettings.values?.length) && (
          <span css={styles.filterBadge}>{filterSettings.values?.length}</span>
        )}
      </button>
      <DropdownMenu
        isOpen={isOpen}
        additionalStyles={css`
          position: fixed;
          top: ${menuTop};
          right: ${menuRight};
          overflow: visible;
          max-width: 200px;
          min-width: 200px;
        `}
      >
        <AdminDropdownHeader onClose={handleClickOutside}>
          Filters ({filterSettings?.values?.length ?? 0})
        </AdminDropdownHeader>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          {controls[filterSettings.type]}
        </Scrollbar>
        <div css={styles.buttonGroup}>
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
