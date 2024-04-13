import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Skeleton,
  FiltersHeaderIconText,
  Alert,
  ViewPicker,
} from '@shared/components';
import { nodeAtoms, NodeSorting } from '@modules/node';
import { styles } from './styles';

export const NodeListHeader = () => {
  const isLoadingNodes = useRecoilValue(nodeAtoms.isLoading);
  const nodeCount = useRecoilValue(nodeAtoms.nodeCount);
  const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );
  const filtersTotal = useRecoilValue(nodeAtoms.filtersTempTotal);
  const [activeView, setactiveView] = useRecoilState(nodeAtoms.activeView);

  const handleFilterCollapseToggled = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleActiveView = (view: View) => {
    setactiveView(view);
  };

  const isLoading = isLoadingNodes !== 'finished';

  return (
    <div css={styles.wrapper}>
      {!isFiltersOpen && (
        <div css={styles.wrapperInner}>
          {isLoading ? (
            <Skeleton width="80px" />
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

      {isLoading ? (
        <Skeleton width="115px" />
      ) : (
        <Alert
          isRounded
          isSuccess={nodeCount > 0}
          additionalStyles={[styles.count]}
        >
          {nodeCount} {nodeCount === 1 ? 'Node' : 'Nodes'}
        </Alert>
      )}

      <NodeSorting />

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <ViewPicker
          activeView={activeView}
          handleActiveView={handleActiveView}
        />
      </div>
    </div>
  );
};
