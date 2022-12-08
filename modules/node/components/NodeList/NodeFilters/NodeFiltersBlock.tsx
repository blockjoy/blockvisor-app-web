import { FilterItem } from '@modules/node/store/nodeAtoms';
import { Checkbox } from '@shared/components';
import {
  ChangeEvent,
  Dispatch,
  EventHandler,
  FC,
  MouseEvent,
  SetStateAction,
} from 'react';
import { SetterOrUpdater } from 'recoil';
import { styles } from './NodeFiltersBlock.styles';
import IconCheck from '@public/assets/icons/check-16.svg';
import IconPlus from '@public/assets/icons/plus-12.svg';
import IconMinus from '@public/assets/icons/minus-12.svg';

type FilterBlock = {
  name: string;
  isOpen: boolean;
  filterCount: number;
  filterList: FilterItem[];
  setFilterList: SetterOrUpdater<FilterItem[]>;
  onPlusMinusClicked: (filterName: string, args1: boolean) => void;
  onFilterBlockClicked: (args0: string) => void;
  onFilterChanged: (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setter: SetterOrUpdater<FilterItem[]>,
  ) => void;
};

export const NodeFiltersBlock: FC<FilterBlock> = ({
  name,
  isOpen,
  filterCount,
  filterList,
  onPlusMinusClicked,
  onFilterBlockClicked,
  onFilterChanged,
  setFilterList,
}) => {
  const handleMinusClicked = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onPlusMinusClicked(name, isOpen);
  };

  return (
    <div css={styles.filterBlock} onClick={() => onFilterBlockClicked(name)}>
      <label css={styles.labelHeader}>
        <span css={styles.labelText}>
          {name} {filterCount ? `(${filterCount})` : ''}
        </span>
        <a css={styles.labelIcon} onClick={handleMinusClicked}>
          {isOpen ? <IconMinus /> : <IconPlus />}
        </a>
      </label>
      <div
        style={{ padding: !isOpen && !filterCount ? '0' : '' }}
        css={[styles.checkboxList, styles.checkboxListShowAll]}
      >
        {isOpen
          ? filterList?.map((item) => (
              <div css={styles.checkboxRow}>
                <Checkbox
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                    onFilterChanged(e, filterList, setFilterList);
                  }}
                  name={item.name!}
                  checked={item.isChecked}
                >
                  {item.name}
                </Checkbox>
              </div>
            ))
          : filterList
              .filter((item) => item.isChecked)
              .map((item) => (
                <div css={styles.selectedFilterRow}>
                  <IconCheck />
                  {item.name}
                </div>
              ))}
      </div>
    </div>
  );
};
