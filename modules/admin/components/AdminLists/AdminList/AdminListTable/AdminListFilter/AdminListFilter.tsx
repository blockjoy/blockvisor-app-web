import {
  AdminListFilterBlockchain,
  AdminListFilterDefault,
  AdminListFilterOrg,
  AdminListFilterUser,
  AdminListFilterHost,
  AdminListFilterRegion,
  AdminListFilterIp,
  AdminListFilterNetwork,
  AdminListFilterVersion,
} from '@modules/admin';
import { Button, DropdownMenu, SvgIcon } from '@shared/components';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './AdminListFilter.styles';
import { css } from '@emotion/react';
import IconFilter from '@public/assets/icons/common/Filter.svg';
import { he } from 'date-fns/locale';

type Props = {
  filterSettings: AdminListColumnFilterSettings;
  filters: AdminListColumn[];
  tableScrollPosition: number;
  headerRef: RefObject<HTMLSpanElement>;
  onChange: (filters: AdminListColumn[]) => void;
};

export const AdminListFilter = ({
  filterSettings,
  filters,
  tableScrollPosition,
  headerRef,
  onChange,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState<string>();
  const [menuLeft, setMenuLeft] = useState<string>();
  const [maxWidth, setMaxWidth] = useState<string>();

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
        values={filterSettings.values!}
      />
    ),
    org: (
      <AdminListFilterOrg
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    user: (
      <AdminListFilterUser
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    host: (
      <AdminListFilterHost
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    region: (
      <AdminListFilterRegion
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    ip: (
      <AdminListFilterIp
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    network: (
      <AdminListFilterNetwork
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    version: (
      <AdminListFilterVersion
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
    default: (
      <AdminListFilterDefault
        items={filterSettings.dropdownItems!}
        onChange={handleChange}
        values={filterSettings.values!}
      />
    ),
  };

  const setMenuPosition = () => {
    const rect = headerRef.current?.getBoundingClientRect();
    const top = rect?.top! + 50;
    const left = rect?.left!;
    const maxWidth = headerRef.current?.clientWidth;
    setMenuLeft(`${left!}px`);
    setMenuTop(`${top}px`);
    setMaxWidth(`${maxWidth}px`);
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
          left: ${menuLeft};
          right: auto;
          overflow: visible;
          max-width: ${maxWidth};
          width: ${maxWidth};
          min-width: ${maxWidth};
        `}
      >
        {controls[filterSettings.type]}
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
