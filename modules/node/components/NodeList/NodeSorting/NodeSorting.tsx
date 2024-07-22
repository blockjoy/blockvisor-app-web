import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { Sorting, SortingItem } from '@shared/components';
import { nodeAtoms, nodeSelectors } from '@modules/node';
import { settingsAtoms, useSettings } from '@modules/settings';

const items: SortingItem<NodeSortField>[] = [
  {
    id: 'name-asc',
    name: 'Name: A-Z',
    field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'name-desc',
    name: 'Name: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-desc',
    name: 'Newest first',
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-asc',
    name: 'Oldest first',
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'status-asc',
    name: 'Status: A-Z',
    field: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'status-desc',
    name: 'Status: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
];

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
    items.find(
      (item) =>
        item.field === nodeSort?.[0].field &&
        item.order === nodeSort?.[0].order,
    ) ?? items[0];

  return (
    <Sorting<NodeSortField>
      items={items}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
      disabled={
        appLoadingState !== 'finished' || nodeListLoadingState !== 'finished'
      }
    />
  );
};
