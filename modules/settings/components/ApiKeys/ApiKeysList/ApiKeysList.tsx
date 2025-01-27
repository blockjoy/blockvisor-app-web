import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { ApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { EmptyColumn, sort, Table, TableSkeleton } from '@shared/components';
import { BaseQueryParams } from '@shared/common/common';
import {
  settingsAtoms,
  mapApiKeysToRows,
  settingsSelectors,
  useSettings,
  API_KEYS_QUERY_PARAMS,
} from '@modules/settings';

type Props = {
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeysList = ({ handleView }: Props) => {
  const [apiKeys, setApiKeys] = useRecoilState(settingsAtoms.apiKeys);
  const setApiKey = useSetRecoilState(settingsAtoms.apiKey);
  const apiKeysLoadingState = useRecoilValue(settingsAtoms.apiKeysLoadingState);
  const apiKeysSort = useRecoilValue(settingsSelectors.apiKeysSort);

  const { updateSettings } = useSettings();

  const handleClick = (id: string) => {
    const apiKey = apiKeys.find((apiKey) => apiKey.apiKeyId === id);
    if (!apiKey) return;

    setApiKey(apiKey);
    handleView?.({
      drawer: 'view',
      modal: null,
    });
  };

  const handleSort = (key: keyof ApiKey) => {
    const newSortOrder =
      apiKeysSort.order === SortOrder.SORT_ORDER_DESCENDING ||
      key !== apiKeysSort.field
        ? SortOrder.SORT_ORDER_ASCENDING
        : SortOrder.SORT_ORDER_DESCENDING;

    const newSort: ApiKeysSort = {
      field: key,
      order: newSortOrder,
    };

    setApiKeys((prevSortedApiKeys) => sort(prevSortedApiKeys, newSort));

    updateSettings('apiKeys', {
      sort: newSort,
    });
  };

  const handleAction = (view: ApiKeysView, apiKey: ApiKey) => {
    handleView?.(view);
    setApiKey(apiKey);
  };

  const { headers, rows } = mapApiKeysToRows(apiKeys, handleAction);

  const queryParams: BaseQueryParams = {
    ...API_KEYS_QUERY_PARAMS,
    sort: [apiKeysSort],
  };

  if (apiKeysLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <div>
      {apiKeys.length ? (
        <Table
          isLoading={apiKeysLoadingState}
          headers={headers}
          preload={0}
          rows={rows}
          fixedRowHeight="70px"
          handleSort={handleSort}
          queryParams={queryParams}
          onRowClick={handleClick}
        />
      ) : (
        <EmptyColumn
          title="No Api keys"
          description="When you add api keys, they will be shown here."
        />
      )}
    </div>
  );
};
