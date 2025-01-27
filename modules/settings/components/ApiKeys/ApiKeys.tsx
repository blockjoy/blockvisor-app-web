import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  settingsAtoms,
  ApiKeyForm,
  ApiKeysHeader,
  ApiKeysList,
  ApiKeyView,
  ApiKeyActions,
  DEFAULT_API_KEYS_VIEW,
} from '@modules/settings';
import { TableSkeleton } from '@shared/components';

export const ApiKeys = () => {
  const apiKeysLoadingState = useRecoilValue(settingsAtoms.apiKeysLoadingState);

  const [view, setView] = useState<ApiKeysView>(DEFAULT_API_KEYS_VIEW);

  const handleView = (nextView: ApiKeysView) =>
    setView((prevView) => ({
      ...prevView,
      ...nextView,
    }));

  return (
    <div>
      <ApiKeysHeader handleView={handleView} />

      {apiKeysLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <ApiKeysList handleView={handleView} />
      )}

      <ApiKeyForm view={view.drawer} handleView={handleView} />

      {view.modal === 'viewToken' ? (
        <ApiKeyView handleView={handleView} />
      ) : view.modal === 'delete' ? (
        <ApiKeyActions view={view.modal} handleView={handleView} />
      ) : null}
    </div>
  );
};
