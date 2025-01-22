import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { ListApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { Button, DeleteModal, SvgIcon } from '@shared/components';
import { settingsAtoms, useApiKeys } from '@modules/settings';
import { styles } from './ApiKeyActions.styles';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconPencil from '@public/assets/icons/common/Pencil.svg';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';

type Props = {
  apiKey: ListApiKey;
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeyActions = ({ apiKey, handleView }: Props) => {
  const setApiKey = useSetRecoilState(settingsAtoms.apiKey);

  const [actionView, setActionView] = useState<ApiKeyAction | null>(null);
  const [error, setError] = useState<string>('');

  const { deleteApiKey, regenerateApiKey } = useApiKeys();

  const handleClose = () => setActionView(null);

  const handleDelete = async () => {
    await deleteApiKey(
      { apiKeyId: apiKey.apiKeyId! },
      () => {
        toast.success('API Key Deleted');
        handleClose();
      },
      (error) => setError(error),
    );
  };

  const handleRegenerate = async () => {
    await regenerateApiKey(
      { apiKeyId: apiKey.apiKeyId! },
      () => {
        toast.success('API Key Regenerated');
        handleClose();
        handleView?.('view');
      },
      (error) => setError(error),
    );
  };

  const handleEdit = () => {
    setApiKey(apiKey);
    handleView?.('update');
  };

  return (
    <>
      <div>
        <Button
          style="icon"
          onClick={handleEdit}
          tooltip="Update"
          customCss={[styles.button]}
        >
          <SvgIcon size="20px">
            <IconPencil />
          </SvgIcon>
        </Button>
        <Button
          style="icon"
          onClick={() => setActionView('regenerate')}
          tooltip="Regenerate"
          customCss={[styles.button]}
        >
          <SvgIcon size="20px">
            <IconRefresh />
          </SvgIcon>
        </Button>
        <Button
          style="icon"
          onClick={() => setActionView('delete')}
          tooltip="Delete"
          customCss={[styles.button, styles.buttonDelete]}
        >
          <SvgIcon size="20px">
            <IconDelete />
          </SvgIcon>
        </Button>
      </div>

      {actionView === 'delete' && (
        <DeleteModal
          portalId="delete-api-key-modal"
          elementName={apiKey.label ?? ''}
          entityName="API Key"
          onHide={handleClose}
          onSubmit={handleDelete}
          error={error}
        />
      )}

      {actionView === 'regenerate' && (
        <DeleteModal
          portalId="regenerate-api-key-modal"
          elementName={apiKey.label ?? ''}
          entityName="API Key"
          type="Regenerate"
          onHide={handleClose}
          onSubmit={handleRegenerate}
          error={error}
        />
      )}
    </>
  );
};
