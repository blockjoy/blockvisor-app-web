import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Skeleton,
  GridTableViewPicker,
  FiltersHeaderIconText,
  Alert,
} from '@shared/components';
import { nodeAtoms, useNodeList } from '@modules/node';
import { styles } from './styles';

export const NodeListHeader = () => {
  const isLoadingNodes = useRecoilValue(nodeAtoms.isLoading);
  const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );
  const filtersTotal = useRecoilValue(nodeAtoms.filtersTempTotal);
  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );

  const { nodeCount } = useNodeList();

  const handleFilterCollapseToggled = () => {
    setIsFiltersOpen(!isFiltersOpen);
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

      <Alert isRounded isSuccess={nodeCount > 0}>
        {nodeCount} {nodeCount === 1 ? 'Node' : 'Nodes'}
      </Alert>

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleGridTableViewChanged}
          activeListType={activeListType}
        />
      </div>
    </div>
  );
};
