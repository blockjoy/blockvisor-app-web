import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { useViewport } from '@shared/index';
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerContent,
  FormError,
  OrganizationPicker,
} from '@shared/components';
import {
  useApiKeys,
  settingsAtoms,
  generateApiKeyFormParams,
  API_KEY_FORM_DEFAULT_VALUES,
} from '@modules/settings';
import { authAtoms } from '@modules/auth';
import { layoutSelectors } from '@modules/layout';
import { organizationSelectors } from '@modules/organization';
import { ApiKeyFormHeader } from './ApiKeyFormHeader/ApiKeyFormHeader';
import { ApiKeyFormFields } from './ApiKeyFormFields/ApiKeyFormFields';
import { styles } from './ApiKeyForm.styles';

export type ApiKeyForm = {
  label: string;
  resourceId: string;
  resourceType: ResourceType;
  permissions: string[];
};

type Props = {
  view?: ApiKeysView['drawer'];
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeyForm = ({ view, handleView }: Props) => {
  const [apiKey, setApiKey] = useRecoilState(settingsAtoms.apiKey);

  const user = useRecoilValue(authAtoms.user);
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const userSettingsLoadingState = useRecoilValue(
    authAtoms.userSettingsLoadingState,
  );
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);

  const [error, setError] = useState<string | null>(null);

  const { isMed } = useViewport();

  const { apiKeyLoadingState, createApiKey, listApiKeys } = useApiKeys();

  const form = useForm<ApiKeyForm>({
    defaultValues: API_KEY_FORM_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (apiKey?.label && apiKey.resource) {
      form.reset({
        label: apiKey?.label,
        resourceId: apiKey?.resource?.resourceId,
        resourceType: apiKey?.resource?.resourceType,
        permissions: apiKey?.permissions,
      });
    }
  }, [apiKey]);

  const {
    formState: { isValid, isDirty },
  } = form;

  const handleSubmit = async (params: ApiKeyForm) => {
    const createParams = generateApiKeyFormParams(
      params,
      user?.userId,
      defaultOrganization?.orgId,
    );

    const successCallback = () => {
      toast.success(`Api Key is created successfully`);

      handleView?.({
        drawer: 'view',
        modal: 'viewToken',
      });

      listApiKeys();

      setError(null);
      form.reset(API_KEY_FORM_DEFAULT_VALUES);
    };

    const errorCallback = (err: string) => {
      setError(err);
    };

    await createApiKey(createParams, successCallback, errorCallback);
  };

  const handleClose = () => {
    handleView?.({
      drawer: null,
      modal: null,
    });

    setTimeout(() => {
      setApiKey(null);
      setError(null);
      form.reset(API_KEY_FORM_DEFAULT_VALUES);
    }, 300);
  };

  const handleDeleteView = () => {
    handleView?.({
      modal: 'delete',
    });
  };

  const isOpen = view === 'view' || view === 'create';

  return (
    <Drawer
      header={<ApiKeyFormHeader view={view} />}
      isOpen={isOpen}
      onClose={handleClose}
      asideStyles={[styles.drawer(isSidebarOpen)]}
    >
      <DrawerContent bottomBorder={false}>
        {isMed && (
          <div css={styles.orgPicker}>
            <OrganizationPicker />
          </div>
        )}

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ApiKeyFormFields form={form} view={view} />

            <div css={styles.bottom}>
              <ButtonGroup>
                {!apiKey ? (
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
                    Add
                  </Button>
                ) : (
                  <Button
                    onClick={handleDeleteView}
                    style="warning"
                    size="small"
                  >
                    Delete
                  </Button>
                )}
                <Button onClick={handleClose} style="outline" size="small">
                  Cancel
                </Button>
              </ButtonGroup>

              <FormError
                isVisible={Boolean(error)}
                additionalStyles={styles.error}
              >
                {error}
              </FormError>
            </div>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};
