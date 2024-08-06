import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { HostSortField } from '@modules/grpc/library/blockjoy/v1/host';
import { Sorting, SortingItem } from '@shared/components';
import { hostAtoms, hostSelectors } from '@modules/host';
import { settingsAtoms, useSettings } from '@modules/settings';

const items: SortingItem<HostSortField>[] = [
  {
    id: 'name-asc',
    name: 'Name: A-Z',
    field: HostSortField.HOST_SORT_FIELD_HOST_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'name-desc',
    name: 'Name: Z-A',
    field: HostSortField.HOST_SORT_FIELD_HOST_NAME,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-desc',
    name: 'Newest first',
    field: HostSortField.HOST_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-asc',
    name: 'Oldest first',
    field: HostSortField.HOST_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
];

export const HostSorting = () => {
  const hostSort = useRecoilValue(hostSelectors.hostSort);
  const hostListLoadingState = useRecoilValue(hostAtoms.hostListLoadingState);
  const [appLoadingState, setAppLoadingState] = useRecoilState(
    settingsAtoms.appLoadingState,
  );
  const resetPagination = useResetRecoilState(hostAtoms.hostListPagination);

  const { updateSettings } = useSettings();

  const handleSelect = (item: SortingItem<HostSortField> | null) => {
    setAppLoadingState('loading');
    updateSettings(
      'hosts',
      { sort: [{ field: item?.field!, order: item?.order! }] },
      resetPagination,
    );
  };

  const selectedItem =
    items.find(
      (item) =>
        item.field === hostSort?.[0].field &&
        item.order === hostSort?.[0].order,
    ) ?? items[0];

  return (
    <Sorting<HostSortField>
      items={items}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
      disabled={
        appLoadingState !== 'finished' || hostListLoadingState !== 'finished'
      }
    />
  );
};
