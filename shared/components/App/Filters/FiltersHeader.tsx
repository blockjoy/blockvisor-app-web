import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import { styles } from './FiltersHeader.styles';
import { FiltersHeaderIconText } from './FiltersHeaderIconText';
import { Skeleton, ViewPicker } from '@shared/components';
import { OrganizationPicker } from '@shared/components';
import IconClose from '@public/assets/icons/common/ArrowLeft.svg';

export type FiltersHeaderProps = {
  isLoading: boolean;
  filtersTotal: number;
  handleFiltersToggle: VoidFunction;
  hideFilters?: boolean;
  elements?: ReactNode;
  activeView?: View;
  handleActiveView?: (view: View) => void;
};

export const FiltersHeader = ({
  isLoading,
  filtersTotal,
  handleFiltersToggle,
  hideFilters = false,
  elements,
  activeView,
  handleActiveView,
}: FiltersHeaderProps) => {
  return (
    <header css={styles.header}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div css={styles.wrapper}>
            {!hideFilters ? (
              <button onClick={handleFiltersToggle} css={styles.filtersButton}>
                <span css={styles.collapseButton}>
                  <IconClose />
                </span>
                <FiltersHeaderIconText filtersTotal={filtersTotal} />
              </button>
            ) : null}
            {elements ? elements : null}
            <ViewPicker
              type="dropdown"
              activeView={activeView}
              handleActiveView={handleActiveView}
            />
          </div>
          <div css={styles.orgPicker}>
            {isMobile && <OrganizationPicker maxWidth="140px" isRightAligned />}
          </div>
        </>
      )}
    </header>
  );
};
