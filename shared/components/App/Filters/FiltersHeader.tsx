import { styles } from './FiltersHeader.styles';
import { FiltersHeaderIconText } from './FiltersHeaderIconText';
import { Skeleton } from '@shared/components';
import { OrganizationPicker } from '@shared/components';
import { useViewport } from '@shared/index';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';
import IconClose from '@public/assets/icons/common/ArrowLeft.svg';

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
  const { isLrg } = useViewport();

  return (
    <header css={styles.header}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <button onClick={handleFiltersToggle} css={styles.filtersButton}>
            <span css={styles.collapseButton}>
              <IconClose />
            </span>
            <FiltersHeaderIconText filtersTotal={filtersTotal} />
            <span css={styles.dropdownIcon}>
              {isFiltersOpen ? <IconMinus /> : <IconPlus />}
            </span>
          </button>
          <div css={styles.orgPicker}>
            {isLrg && <OrganizationPicker maxWidth="140px" isRightAligned />}
          </div>
        </>
      )}
    </header>
  );
};
