import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TableSkeleton } from '@shared/components';
import { settingsAtoms, DEFAULT_API_KEYS_VIEW } from '@modules/settings';
import { usePersonalPermissions } from '@modules/auth';
import { organizationSelectors } from '@modules/organization';
import { ApiKeysHeader } from './ApiKeysHeader/ApiKeysHeader';
import { ApiKeysList } from './ApiKeysList/ApiKeysList';
import { ApiKeyForm } from './ApiKeyForm/ApiKeyForm';
import { ApiKeyView } from './ApiKeyView/ApiKeyView';
import { ApiKeyActions } from './ApiKeyActions/ApiKeyActions';

export const ApiKeys = () => {
  const personalOrganization = useRecoilValue(
    organizationSelectors.personalOrganization,
  );
  const apiKeysLoadingState = useRecoilValue(settingsAtoms.apiKeysLoadingState);

  const [view, setView] = useState<ApiKeysView>(DEFAULT_API_KEYS_VIEW);

  const { listPermissions } = usePersonalPermissions();

  useEffect(() => {
    if (personalOrganization) listPermissions();
  }, [personalOrganization]);

  const handleView = (nextView: ApiKeysView) => {
    setView((prevView) => ({
      ...prevView,
      ...nextView,
    }));
  };

  return (
    <>
      <ApiKeysHeader handleView={handleView} />

      {apiKeysLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <ApiKeysList handleView={handleView} />
      )}

      {view.drawer && <ApiKeyForm view={view.drawer} handleView={handleView} />}

      {view.modal === 'viewToken' ? (
        <ApiKeyView handleView={handleView} />
      ) : view.modal === 'delete' ? (
        <ApiKeyActions view={view} handleView={handleView} />
      ) : null}
    </>
  );
};
