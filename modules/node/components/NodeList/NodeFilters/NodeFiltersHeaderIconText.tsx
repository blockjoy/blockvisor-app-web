import { styles } from './NodeFiltersHeader.styles';
import IconFilter from '@public/assets/icons/filter-1-12.svg';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { useRecoilValue } from 'recoil';

export const NodeFiltersHeaderIconText = () => {
  const filtersBlockchain = useRecoilValue(nodeAtoms.filtersBlockchain);

  const filtersType = useRecoilValue(nodeAtoms.filtersType);

  const filtersStatus = useRecoilValue(nodeAtoms.filtersStatus);

  const filtersHealth = useRecoilValue(nodeAtoms.filtersHealth);

  console.log('filtersBlockchain', filtersBlockchain);

  const totalFilterCount =
    Number(filtersBlockchain.filter((s) => s.isChecked)?.length > 0) +
    Number(filtersType.filter((s) => s.isChecked)?.length > 0) +
    Number(filtersStatus.filter((s) => s.isChecked)?.length > 0) +
    Number(!filtersHealth ? 0 : 1);

  return (
    <span css={styles.title}>
      <span css={styles.filterIcon}>
        <IconFilter />
        {totalFilterCount ? (
          <span css={styles.badge}>{totalFilterCount}</span>
        ) : null}
      </span>
      Filters
    </span>
  );
};
