import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  settingsAtoms,
  ApiKeyForm,
  ApiKeysHeader,
  ApiKeysList,
  ApiKeyView,
} from '@modules/settings';
import { TableSkeleton } from '@shared/components';
import { containers } from 'styles/containers.styles';

export const ApiKeys = () => {
  const apiKeysLoadingState = useRecoilValue(settingsAtoms.apiKeysLoadingState);

  const [view, setView] = useState<ApiKeysView>('list');

  const handleView = (newView: ApiKeysView) => setView(newView);

  return (
    <div css={containers.mediumLarge}>
      <ApiKeysHeader handleView={handleView} />

      {apiKeysLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <ApiKeysList handleView={handleView} />
      )}

      {view === 'view' && <ApiKeyView handleView={handleView} />}

      <ApiKeyForm action={view} handleView={handleView} />
    </div>
  );
};
