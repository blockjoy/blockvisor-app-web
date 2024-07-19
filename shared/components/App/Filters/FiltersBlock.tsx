import { ChangeEvent } from 'react';
import { Checkbox, FiltersWrapper } from '@shared/components';
import { styles } from './FiltersBlock.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import IconCheck from '@public/assets/icons/common/Check.svg';

type FiltersBlockProps = {
  hasError: boolean;
  isOpen: boolean;
  filter: FilterItem;
  onPlusMinusClicked: (filterId: string, isOpen: boolean) => void;
  onFilterBlockClicked: (id: string) => void;
  onFilterChanged: (type: string, value: string) => void;
};

export const FiltersBlock = ({
  hasError,
  isOpen,
  filter,
  onPlusMinusClicked,
  onFilterBlockClicked,
  onFilterChanged,
}: FiltersBlockProps) => {
  const { id, name, disabled, count, list } = filter;

  return (
    <FiltersWrapper
      id={id}
      name={name}
      isOpen={isOpen}
      onFilterBlockClicked={onFilterBlockClicked}
      onPlusMinusClicked={onPlusMinusClicked}
      isDisabled={disabled}
    >
      <div
        style={{ padding: !isOpen && !count ? '0' : '' }}
        css={[styles.checkboxList, styles.checkboxListShowAll]}
      >
        {isOpen ? (
          hasError ? (
            <div css={[typo.smaller, colors.warning]}>Error loading data</div>
          ) : !list?.length ? (
            <p css={[typo.smaller, colors.text4]}>No data</p>
          ) : (
            list
              ?.filter((item) => item.id)
              ?.map((item) => (
                <div key={item.id} css={styles.checkboxRow}>
                  <Checkbox
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onFilterChanged(id, item.id!);
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
          list
            ?.filter((item) => item.isChecked)
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
    </FiltersWrapper>
  );
};
