import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { nodeAtoms, nodeSelectors } from '@modules/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { settingsAtoms, useSettings } from '@modules/settings';

export const useNodeSort = () => {
  const nodeSort = useRecoilValue(nodeSelectors.nodeSort);
  const resetPagination = useResetRecoilState(nodeAtoms.nodeListPagination);
  const setAppLoadingState = useSetRecoilState(settingsAtoms.appLoadingState);

  const { updateSettings } = useSettings();

  const updateSorting = async (key: NodeSortField, order?: SortOrder) => {
    setAppLoadingState('loading');

    const sortingMatch = nodeSort?.find(
      (singleSort) => singleSort.field === key,
    );

    const sortOrder =
      order ??
      (sortingMatch?.order === SortOrder.SORT_ORDER_DESCENDING ||
      key !== nodeSort?.[0].field
        ? SortOrder.SORT_ORDER_ASCENDING
        : SortOrder.SORT_ORDER_DESCENDING);

    const updatedSort = [
      {
        field: key,
        order: sortOrder,
      },
    ];

    await updateSettings('nodes', { sort: updatedSort }, resetPagination);
  };

  return {
    updateSorting,
  };
};
