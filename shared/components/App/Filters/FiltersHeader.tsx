import { styles } from './FiltersHeader.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';
import IconClose from '@public/assets/icons/common/ArrowLeft.svg';
import { FiltersHeaderIconText } from './FiltersHeaderIconText';
import { Skeleton } from '@shared/components';

export type FiltersHeaderProps = {
  isLoading: boolean;
  filtersTotal: number;
  isFiltersOpen: boolean;
  handleFiltersToggle: VoidFunction;
};

export const FiltersHeader = ({
  isLoading,
  filtersTotal,
  isFiltersOpen,
  handleFiltersToggle,
}: FiltersHeaderProps) => {
  return (
    <header css={styles.header} onClick={handleFiltersToggle}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <span css={styles.collapseButton}>
            <IconClose />
          </span>
          <FiltersHeaderIconText filtersTotal={filtersTotal} />
          <span css={styles.dropdownIcon}>
            {isFiltersOpen ? <IconMinus /> : <IconPlus />}
          </span>
        </>
      )}
    </header>
  );
};
