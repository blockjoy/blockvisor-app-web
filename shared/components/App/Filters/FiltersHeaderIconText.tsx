import IconFilter from '@public/assets/icons/filter-1-12.svg';
import { styles } from './FiltersHeaderIconText.styles';

type FiltersHeaderIconTextProps = {
  filtersTotal: number;
};

export const FiltersHeaderIconText = ({
  filtersTotal,
}: FiltersHeaderIconTextProps) => {
  return (
    <span css={styles.title}>
      <span css={styles.filterIcon}>
        <IconFilter />
        {filtersTotal ? <span css={styles.badge}>{filtersTotal}</span> : null}
      </span>
      Filters
    </span>
  );
};
