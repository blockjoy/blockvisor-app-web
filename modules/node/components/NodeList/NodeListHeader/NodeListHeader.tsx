import { styles } from './styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import {
  Skeleton,
  GridTableViewPicker,
  FiltersHeaderIconText,
} from '@shared/components';

export const NodeListHeader = () => {
  const isLoadingNodes = useRecoilValue(nodeAtoms.isLoading);
  const totalNodes = useRecoilValue(nodeAtoms.totalNodes);
  const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );

  const filtersTotal = useRecoilValue(nodeAtoms.filtersTotal);

  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );

  const handleFilterCollapseToggled = () => {
    setIsFiltersOpen(!isFiltersOpen);
    localStorage.setItem('nodeFiltersOpen', JSON.stringify(true));
  };

  const handleGridTableViewChanged = (type: string) => {
    setActiveListType(type);
  };

  const isLoading = isLoadingNodes !== 'finished';

  return (
    <div css={styles.wrapper}>
      {!isFiltersOpen && (
        <div css={styles.wrapperInner}>
          {isLoading ? (
            <Skeleton width="90px" />
          ) : (
            <button
              onClick={handleFilterCollapseToggled}
              css={[styles.filterToggle, styles.endBlock]}
            >
              <FiltersHeaderIconText filtersTotal={filtersTotal} />
            </button>
          )}
        </div>
      )}

      {/* <div css={styles.endBlock}>
        <NodeMetrics />
      </div> */}

      {/* <span css={styles.total}>
        {isLoading ? (
          <Skeleton margin="0 0 0 auto" />
        ) : (
          <>
            Total: <span css={styles.totalValue}>{totalNodes} </span>
            {totalNodes === 1 ? 'node' : 'nodes'}
          </>
        )}
      </span> */}

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleGridTableViewChanged}
          activeListType={activeListType}
        />
      </div>
    </div>
  );
};
