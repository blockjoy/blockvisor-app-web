import { Checkbox } from '@shared/components';
import { ChangeEvent, FC, MouseEvent } from 'react';
import { SetterOrUpdater } from 'recoil';
import { styles } from './FiltersBlock.styles';
import IconCheck from '@public/assets/icons/common/Check.svg';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';

type FiltersBlockProps = {
  name: string;
  hasError: boolean;
  isOpen: boolean;
  isDisabled: boolean;
  filterCount: number;
  filterList: FilterItem[];
  setFilterList: SetterOrUpdater<FilterItem[]>;
  onPlusMinusClicked: (filterName: string, args1: boolean) => void;
  onFilterBlockClicked: (name: string) => void;
  onFilterChanged: (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setFilterList: SetterOrUpdater<FilterItem[]>,
  ) => void;
};

export const FiltersBlock = ({
  name,
  hasError,
  isOpen,
  isDisabled,
  filterCount,
  filterList,
  onPlusMinusClicked,
  onFilterBlockClicked,
  onFilterChanged,
  setFilterList,
}: FiltersBlockProps) => {
  const handleMinusClicked = (e: MouseEvent<HTMLLabelElement>) => {
    if (!isDisabled) {
      e.stopPropagation();
      onPlusMinusClicked(name, isOpen);
    }
  };

  const handleFilterBlockClicked = (name: string) => {
    if (!isDisabled) {
      onFilterBlockClicked(name);
    }
  };

  return (
    <div
      css={[styles.filterBlock, isDisabled && styles.filterBlockDisabled]}
      onClick={() => handleFilterBlockClicked(name)}
    >
      <label css={styles.labelHeader} onClick={handleMinusClicked}>
        <span css={styles.labelText}>
          {name} {filterCount ? `(${filterCount})` : ''}
        </span>
        {!isDisabled && (
          <a css={styles.labelIcon}>{isOpen ? <IconMinus /> : <IconPlus />}</a>
        )}
      </label>
      <div
        style={{ padding: !isOpen && !filterCount ? '0' : '' }}
        css={[styles.checkboxList, styles.checkboxListShowAll]}
      >
        {isOpen ? (
          hasError ? (
            <div css={[typo.smaller, colors.warning]}>Error loading data</div>
          ) : (
            filterList
              ?.filter((item) => item.id)
              ?.map((item) => (
                <div key={item.id} css={styles.checkboxRow}>
                  <Checkbox
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onFilterChanged(e, filterList, setFilterList);
                    }}
                    id={item.id}
                    name={item.name!}
                    checked={item.isChecked}
                  >
                    <p css={styles.selectedFilterRowText}>
                      {item.name?.replaceAll('_', ' ')}
                    </p>
                  </Checkbox>
                </div>
              ))
          )
        ) : (
          filterList
            .filter((item) => item.isChecked)
            .map((item) => (
              <div key={item.id} css={styles.selectedFilterRow}>
                <div css={styles.checkedIcon}>
                  <IconCheck />
                </div>
                <p css={styles.selectedFilterRowText}>
                  {item.name?.replaceAll('_', ' ')}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
