import IconFilter from '@public/assets/icons/common/Filter.svg';
import { SvgIcon } from '@shared/components';
import { styles } from './FiltersHeaderIconText.styles';

type FiltersHeaderIconTextProps = {
  filtersTotal: number;
};

export const FiltersHeaderIconText = ({
  filtersTotal,
}: FiltersHeaderIconTextProps) => {
  return (
    <span
      css={styles.title}
      {...(isFiltersOpen ? { className: 'active' } : null)}
    >
      <span css={styles.filterIcon}>
        <SvgIcon size="14px">
          <IconFilter />
        </SvgIcon>
        {filtersTotal ? <span css={styles.badge}>{filtersTotal}</span> : null}
      </span>
      <span css={styles.label}>Filters</span>
    </span>
  );
};
