import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import {
  ApiKeyServiceCreateRequest,
  ApiKeyServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/api_key';
import { ApiKeyFormFields, useApiKeys, settingsAtoms } from '@modules/settings';
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerContent,
  FormError,
} from '@shared/components';
import { authAtoms } from '@modules/auth';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './ApiKeyForm.styles';

export type ApiKeyFormParams = {
  label: string;
  resourceId: string;
  resourceType: ResourceType;
};

type Props = {
  action?: Partial<ApiKeysView>;
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeyForm = ({ action, handleView }: Props) => {
  const [apiKey, setApiKey] = useRecoilState(settingsAtoms.apiKey);

  const userSettingsLoadingState = useRecoilValue(
    authAtoms.userSettingsLoadingState,
  );

  const [error, setError] = useState<string | null>(null);

  const { apiKeyLoadingState, createApiKey, updateApiKey, listApiKeys } =
    useApiKeys();

  const defaultValues = {
    label: '',
    resourceId: '',
    resourceType: ResourceType.RESOURCE_TYPE_UNSPECIFIED,
  };

  const form = useForm<ApiKeyFormParams>({ defaultValues });

  const {
    formState: { isValid, isDirty },
  } = form;

  const handleSubmit = async (params: ApiKeyFormParams) => {
    const successCallback = () => {
      toast.success(`Api Key is ${action}d successfully`);

      if (action === 'create') {
        handleView?.('view');
        listApiKeys();
      } else {
        handleView?.('list');
      }

      form.reset(defaultValues);
    };

    const errorCallback = (err: string) => setError(err);

    if (action === 'create') {
      const createParams: ApiKeyServiceCreateRequest = {
        label: params.label,
        resource: {
          resourceId: params.resourceId,
          resourceType: params.resourceType,
        },
      };

      await createApiKey(createParams, successCallback, errorCallback);
    } else {
      const updateParams: ApiKeyServiceUpdateRequest = {
        apiKeyId: apiKey?.apiKeyId!,
        label: params.label,
      };

      await updateApiKey(updateParams, successCallback, errorCallback);
    }
  };

  const handleClose = () => {
    handleView?.('list');
    setApiKey(null);

    setTimeout(() => {
      form.reset(defaultValues);
    }, 300);
  };

  useEffect(() => {
    if (apiKey?.label && apiKey.resource) {
      form.reset({
        label: apiKey?.label,
        resourceId: apiKey?.resource?.resourceId,
        resourceType: apiKey?.resource?.resourceType,
      });
    }
  }, [apiKey]);

  const isOpen = action === 'create' || action === 'update';

  return (
    <Drawer
      title={`${action === 'create' ? 'Add' : 'Update'} API key`}
      isOpen={isOpen}
      onClose={handleClose}
      asideStyles={[styles.drawer]}
    >
      <DrawerContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div css={spacing.bottom.mediumLarge}>
              <ApiKeyFormFields form={form} action={action} />
            </div>

            <ButtonGroup>
              <Button
                loading={apiKeyLoadingState !== 'finished'}
                disabled={
                  apiKeyLoadingState !== 'finished' ||
                  !isValid ||
                  !isDirty ||
                  userSettingsLoadingState === 'loading'
                }
                style="primary"
                size="small"
                type="submit"
              >
                {action === 'create' ? 'Add' : 'Update'}
              </Button>
              <Button onClick={handleClose} style="outline" size="small">
                Cancel
              </Button>
            </ButtonGroup>

            <FormError isVisible={Boolean(error)}>{error}</FormError>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};
