import { styles } from './tableFilters.styles';
import IconFilter from '@public/assets/icons/filter-1-12.svg';

export const TableFilters = () => (
  <div css={styles.wrapper}>
    <header css={styles.header}>
      <IconFilter />
      Filters (2)
    </header>
  </div>
);
