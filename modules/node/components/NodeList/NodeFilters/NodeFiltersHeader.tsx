import { styles } from './NodeFiltersHeader.styles';
import IconFilter from '@public/assets/icons/filter-1-12.svg';
import IconPlus from '@public/assets/icons/plus-12.svg';
import IconMinus from '@public/assets/icons/minus-12.svg';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';

type Props = {
  totalFilterCount?: number;
};

export const NodeFiltersHeader: FC<Props> = ({ totalFilterCount }) => {
  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );

  const handleClick = () => {
    console.log('handleClick');
    setFiltersOpen(!isFiltersOpen);
  };

  return (
    <header css={styles.header} onClick={handleClick}>
      <span css={styles.title}>
        <IconFilter />
        Filters {totalFilterCount !== undefined ? `(${totalFilterCount})` : ''}
      </span>
      <span css={styles.dropdownIcon}>
        {isFiltersOpen ? <IconMinus /> : <IconPlus />}
      </span>
    </header>
  );
};
