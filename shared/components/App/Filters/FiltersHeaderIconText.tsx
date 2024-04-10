import IconFilter from '@public/assets/icons/common/Filter.svg';
import { SvgIcon } from '@shared/components';
import { styles } from './FiltersHeaderIconText.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';

type FiltersHeaderIconTextProps = {
  filtersTotal: number;
  isFiltersOpen: boolean;
};

export const FiltersHeaderIconText = ({
  filtersTotal,
  isFiltersOpen,
}: FiltersHeaderIconTextProps) => {
  return (
    <span css={styles.title}>
      <span css={styles.filterIcon}>
        <SvgIcon size="14px">
          <IconFilter />
        </SvgIcon>
        {filtersTotal ? <span css={styles.badge}>{filtersTotal}</span> : null}
      </span>
      <span css={styles.dropdownIcon}>
        {isFiltersOpen ? <IconMinus /> : <IconPlus />}
      </span>
      <span css={styles.label}>Filters</span>
    </span>
  );
};
