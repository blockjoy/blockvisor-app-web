import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { DeleteModal } from '@shared/components';
import { settingsAtoms, useApiKeys } from '@modules/settings';

type Props = {
  view: ApiKeysView['modal'];
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeyActions = ({ view, handleView }: Props) => {
  const [apiKey, setApiKey] = useRecoilState(settingsAtoms.apiKey);
  const [error, setError] = useState<string>('');

  const { deleteApiKey } = useApiKeys();

  const handleClose = () => {
    handleView?.({
      drawer: null,
      modal: null,
    });

    setApiKey(null);
  };

  const handleDelete = async () => {
    await deleteApiKey(
      { apiKeyId: apiKey?.apiKeyId! },
      () => {
        toast.success('API Key Deleted');
        setApiKey(null);
        handleClose();
      },
      (error) => setError(error),
    );
  };

  return (
    <>
      {view === 'delete' && (
        <DeleteModal
          portalId="delete-api-key-modal"
          elementName={apiKey?.label ?? ''}
          entityName="API Key"
          onHide={handleClose}
          onSubmit={handleDelete}
          error={error}
        />
      )}
    </>
  );
};
