import { styles } from './NodeFiltersHeader.styles';
import IconPlus from '@public/assets/icons/plus-12.svg';
import IconMinus from '@public/assets/icons/minus-12.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { NodeFiltersHeaderIconText } from './NodeFiltersHeaderIconText';

export const NodeFiltersHeader = () => {
  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );

  const [isFiltersCollapsed, setFiltersCollapsed] = useRecoilState(
    nodeAtoms.isFiltersCollapsed,
  );

  const handleClick = () => {
    console.log('handleClick');
    setFiltersOpen(!isFiltersOpen);
    setFiltersCollapsed(!isFiltersCollapsed);
  };

  return (
    <header css={styles.header} onClick={handleClick}>
      <NodeFiltersHeaderIconText />
      <span css={styles.dropdownIcon}>
        {isFiltersOpen ? <IconMinus /> : <IconPlus />}
      </span>
      <span css={styles.collapseButton}>
        <IconClose />
      </span>
    </header>
  );
};
