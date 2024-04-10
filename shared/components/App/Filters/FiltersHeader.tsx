import { styles } from './FiltersHeader.styles';
import { FiltersHeaderIconText } from './FiltersHeaderIconText';
import { Skeleton } from '@shared/components';
import { OrganizationPicker } from '@shared/components';

import IconClose from '@public/assets/icons/common/ArrowLeft.svg';
import { isMobile } from 'react-device-detect';
import { ReactNode } from 'react';

export type FiltersHeaderProps = {
  isLoading: boolean;
  filtersTotal: number;
  isFiltersOpen: boolean;
  handleFiltersToggle: VoidFunction;
  elements?: ReactNode;
};

export const FiltersHeader = ({
  isLoading,
  filtersTotal,
  isFiltersOpen,
  handleFiltersToggle,
  elements,
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
            <FiltersHeaderIconText
              filtersTotal={filtersTotal}
              isFiltersOpen={isFiltersOpen}
            />
          </button>
          {elements ? elements : null}
          <div css={styles.orgPicker}>
            {isMobile && <OrganizationPicker maxWidth="140px" isRightAligned />}
          </div>
        </>
      )}
    </header>
  );
};
