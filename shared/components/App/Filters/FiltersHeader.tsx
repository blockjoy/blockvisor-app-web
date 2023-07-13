import { styles } from './FiltersHeader.styles';
import { FiltersHeaderIconText } from './FiltersHeaderIconText';
import { Skeleton } from '@shared/components';
import { OrganizationPicker } from '@shared/components';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';
import IconClose from '@public/assets/icons/common/ArrowLeft.svg';
import { isMobile } from 'react-device-detect';

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
            {isMobile && <OrganizationPicker isRightAligned />}
          </div>
        </>
      )}
    </header>
  );
};
