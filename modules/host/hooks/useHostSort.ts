import { useRecoilValue, useResetRecoilState } from 'recoil';
import { hostAtoms, hostSelectors } from '@modules/host';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { HostSortField } from '@modules/grpc/library/blockjoy/v1/host';
import { useSettings } from '@modules/settings';

type UseHostSortHook = {
  updateSorting: (key: HostSortField) => Promise<void>;
};

export const useHostSort = (): UseHostSortHook => {
  const hostSort = useRecoilValue(hostSelectors.hostSort);
  const resetPagination = useResetRecoilState(hostAtoms.hostListPagination);

  const { updateSettings } = useSettings();

  const updateSorting = async (key: HostSortField) => {
    const sortingMatch = hostSort?.find(
      (singleSort) => singleSort.field === key,
    );

    const sortOrder =
      sortingMatch?.order === SortOrder.SORT_ORDER_DESCENDING ||
      key !== hostSort?.[0].field
        ? SortOrder.SORT_ORDER_ASCENDING
        : SortOrder.SORT_ORDER_DESCENDING;

    const updatedSort = [
      {
        field: key,
        order: sortOrder,
      },
    ];

    await updateSettings('hosts', { sort: updatedSort }, resetPagination);
  };

  return {
    updateSorting,
  };
};
