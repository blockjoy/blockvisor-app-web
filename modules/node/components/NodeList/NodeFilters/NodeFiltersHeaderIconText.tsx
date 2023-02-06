import { styles } from './NodeFiltersHeader.styles';
import IconFilter from '@public/assets/icons/filter-1-12.svg';
import { useRecoilValue } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';

export const NodeFiltersHeaderIconText = () => {
  const filtersTotal = useRecoilValue(nodeAtoms.filtersTotal);

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
