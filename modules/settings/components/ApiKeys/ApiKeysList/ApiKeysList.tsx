import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { EmptyColumn, TableSkeleton } from '@shared/components';
import { settingsAtoms, settingsSelectors } from '@modules/settings';
import { ApiKeysListItem } from './ApiKeysListItem/ApiKeysListItem';
import { styles } from './ApiKeysList.styles';

type Props = {
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeysList = ({ handleView }: Props) => {
  const setApiKey = useSetRecoilState(settingsAtoms.apiKey);
  const apiKeysSorted = useRecoilValue(settingsSelectors.apiKeysSorted);
  const apiKeysLoadingState = useRecoilValue(settingsAtoms.apiKeysLoadingState);

  const handleAction = (view: ApiKeysView, apiKey: ApiKey) => {
    handleView?.(view);
    setApiKey(apiKey);
  };

  if (apiKeysLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <div css={styles.wrapper}>
      {apiKeysSorted.length ? (
        apiKeysSorted.map((apiKey) => (
          <ApiKeysListItem
            key={apiKey.apiKeyId}
            apiKey={apiKey}
            handleAction={handleAction}
          />
        ))
      ) : (
        <EmptyColumn
          title="No Api keys"
          description="When you add api keys, they will be shown here."
        />
      )}
    </div>
  );
};
