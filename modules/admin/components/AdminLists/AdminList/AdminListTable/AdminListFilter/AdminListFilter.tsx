import { AdminListFilterBlockchain } from './AdminListFilterBlockchain/AdminListFilterBlockchain';
import { AdminListFilterDefault } from './AdminListFilterDefault/AdminListFilterDefault';
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  Scrollbar,
  sort,
  SvgIcon,
} from '@shared/components';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './AdminListFilter.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { css } from '@emotion/react';
import IconFilter from '@public/assets/icons/common/Filter.svg';
import isEqual from 'lodash/isEqual';

type Props = {
  filterSettings: AdminListColumnFilterSettings;
  filtersState: AdminListColumn[];
  tableScrollPosition: number;
  onChange: (filters: AdminListColumn[]) => void;
  onApplied: VoidFunction;
  onPageChanged: (page: number) => void;
};

export const AdminListFilter = ({
  filterSettings,
  filtersState,
  tableScrollPosition,
  onChange,
  onApplied,
  onPageChanged,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState<string>();
  const [menuRight, setMenuRight] = useState<string>();
  const [originalValues, setOriginalValues] = useState<string[]>([]);

  useEffect(() => {
    setOriginalValues(filterSettings.values);
  }, []);

  const handleChange = (item: AdminFilterDropdownItem) => {
    const filtersStateCopy = [...filtersState];

    const foundFilter = filtersStateCopy.find(
      (f) => f.filterSettings?.type === filterSettings.type,
    );

    if (!foundFilter || !foundFilter.filterSettings) return;

    const valueExists = foundFilter?.filterSettings?.values?.some(
      (value) => value === item.id,
    );

    let newValues = foundFilter.filterSettings.values || [];

    if (valueExists) {
      newValues = foundFilter?.filterSettings?.values?.filter(
        (v) => v !== item.id,
      )!;
    } else {
      newValues.push(item.id);
    }

    foundFilter.filterSettings.values = newValues;

    onChange(filtersStateCopy);
  };

  const handleApplied = () => {
    setIsOpen(false);
    onPageChanged(1);
    onApplied();
    setOriginalValues(filterSettings.values);
  };

  const handleReset = () => {
    setIsOpen(false);

    const filtersStateCopy = [...filtersState];

    const foundFilter = filtersStateCopy.find(
      (f) => f.filterSettings?.type === filterSettings.type,
    );

    if (!foundFilter || !foundFilter.filterSettings) return;

    foundFilter.filterSettings.values = [];

    onChange(filtersStateCopy);
    onPageChanged(1);
    onApplied();
  };

  const isDirty = !isEqual(
    sort(filterSettings.values, { order: 'asc' }),
    sort(originalValues, { order: 'asc' }),
  );

  console.log('isDirty', {
    values: sort(filterSettings.values, { order: 'asc' }),
    original: sort(originalValues, { order: 'asc' }),
  });

  const controls = {
    blockchain: (
      <AdminListFilterBlockchain
        onChange={handleChange}
        filterSettings={filterSettings}
      />
    ),
    default: (
      <AdminListFilterDefault
        items={filterSettings.dropdownItems!}
        onChange={handleChange}
        filterSettings={filterSettings}
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

  const handleClickOutside = () => setIsOpen(false);

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  useEffect(() => {
    setMenuPosition();
  }, []);

  useEffect(() => {
    handleClickOutside();
    setMenuPosition();
  }, [tableScrollPosition]);

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
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          {controls[filterSettings.type]}
        </Scrollbar>
        <ButtonGroup>
          <Button
            disabled={!isDirty}
            onClick={handleApplied}
            style="primary"
            size="small"
            display="block"
            css={spacing.top.small}
          >
            Apply
          </Button>
          <Button
            onClick={handleReset}
            style="outline"
            size="small"
            display="block"
            css={spacing.top.small}
          >
            Reset
          </Button>
        </ButtonGroup>
      </DropdownMenu>
    </div>
  );
};
