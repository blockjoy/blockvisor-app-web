import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { Sorting, SortingItem } from '@shared/components';
import { nodeAtoms, nodeSelectors, NODE_LIST_SORTING } from '@modules/node';
import { settingsAtoms, useSettings } from '@modules/settings';

export const NodeSorting = () => {
  const nodeSort = useRecoilValue(nodeSelectors.nodeSort);
  const nodeListLoadingState = useRecoilValue(nodeAtoms.nodeListLoadingState);
  const [appLoadingState, setAppLoadingState] = useRecoilState(
    settingsAtoms.appLoadingState,
  );
  const resetPagination = useResetRecoilState(nodeAtoms.nodeListPagination);

  const { updateSettings } = useSettings();

  const handleSelect = async (item: SortingItem<NodeSortField> | null) => {
    setAppLoadingState('loading');
    await updateSettings(
      'nodes',
      { sort: [{ field: item?.field!, order: item?.order! }] },
      resetPagination,
    );
  };

  const selectedItem =
    NODE_LIST_SORTING.find(
      (item) =>
        item.field === nodeSort?.[0].field &&
        item.order === nodeSort?.[0].order,
    ) ?? NODE_LIST_SORTING[0];

  return (
    <Sorting<NodeSortField>
      items={NODE_LIST_SORTING}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
      size="small"
      disabled={
        appLoadingState !== 'finished' || nodeListLoadingState !== 'finished'
      }
    />
  );
};
