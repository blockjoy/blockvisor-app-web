import { styles } from './NodeFiltersHeader.styles';
import IconPlus from '@public/assets/icons/plus-12.svg';
import IconMinus from '@public/assets/icons/minus-12.svg';
import IconClose from '@public/assets/icons/arrow-left-12.svg';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { NodeFiltersHeaderIconText } from './NodeFiltersHeaderIconText';
import { Skeleton } from '@shared/index';

export type NodeFiltersHeaderProps = {
  isLoading: boolean;
};

export const NodeFiltersHeader = ({ isLoading }: NodeFiltersHeaderProps) => {
  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );

  const handleClick = () => {
    setFiltersOpen(!isFiltersOpen);

    localStorage.setItem('nodeFiltersOpen', JSON.stringify(false));
  };

  return (
    <header css={styles.header} onClick={handleClick}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <span css={styles.collapseButton}>
            <IconClose />
          </span>
          <NodeFiltersHeaderIconText />
          <span css={styles.dropdownIcon}>
            {isFiltersOpen ? <IconMinus /> : <IconPlus />}
          </span>
        </>
      )}
    </header>
  );
};
