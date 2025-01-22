import { useRecoilState } from 'recoil';
import {
  ApiKeyServiceCreateRequest,
  ApiKeyServiceDeleteRequest,
  ApiKeyServiceRegenerateRequest,
  ApiKeyServiceUpdateRequest,
} from '@modules/grpc/library/blockjoy/v1/api_key';
import { apiKeyClient } from '@modules/grpc';
import { settingsAtoms } from '@modules/settings';

export const useApiKeys = () => {
  const [apiKeyToken, setApiKeyToken] = useRecoilState(
    settingsAtoms.apiKeyToken,
  );
  const [apiKeys, setApiKeys] = useRecoilState(settingsAtoms.apiKeys);
  const [apiKeyLoadingState, setApiKeyLoadingState] = useRecoilState(
    settingsAtoms.apiKeyLoadingState,
  );
  const [apiKeysLoadingState, setApiKeysLoadingState] = useRecoilState(
    settingsAtoms.apiKeysLoadingState,
  );

  const listApiKeys = async () => {
    setApiKeysLoadingState('initializing');

    try {
      const response = await apiKeyClient.listApiKeys();

      setApiKeys(response);
    } catch (error) {
      console.log('Failed to fetch Api Keys', error);
      setApiKeys([]);
    } finally {
      setApiKeysLoadingState('finished');
    }
  };

  const createApiKey = async (
    params: ApiKeyServiceCreateRequest,
    onSuccess?: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    setApiKeyLoadingState('initializing');

    try {
      const response = await apiKeyClient.createApiKey(params);

      setApiKeyToken(response);

      onSuccess?.();
    } catch (error: any) {
      console.log('Failed to create the Api Key', error);
      onError?.(error);
      setApiKeyToken(null);
    } finally {
      setApiKeyLoadingState('finished');
    }
  };

  const updateApiKey = async (
    params: ApiKeyServiceUpdateRequest,
    onSuccess?: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    setApiKeyLoadingState('loading');

    try {
      const response = await apiKeyClient.updateApiKey(params);

      setApiKeys((prevApiKeys) =>
        prevApiKeys.map((apiKey) =>
          apiKey.apiKeyId === params.apiKeyId
            ? {
                ...apiKey,
                label: params.label,
                updatedAt: response.updatedAt,
              }
            : apiKey,
        ),
      );

      onSuccess?.();
    } catch (error: any) {
      console.log('Failed to update the Api Key', error);

      onError?.(error);
    } finally {
      setApiKeyLoadingState('finished');
    }
  };

  const regenerateApiKey = async (
    params: ApiKeyServiceRegenerateRequest,
    onSuccess?: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    setApiKeyLoadingState('loading');

    try {
      const response = await apiKeyClient.regenerateApiKey(params);
      setApiKeyToken(response);

      setApiKeys((prevApiKeys) =>
        prevApiKeys.map((apiKey) =>
          apiKey.apiKeyId === params.apiKeyId
            ? {
                ...apiKey,
                updatedAt: response.updatedAt,
              }
            : apiKey,
        ),
      );

      onSuccess?.();
    } catch (error: any) {
      console.log('Failed to regenerate the Api Key', error);
      onError?.(error);
    } finally {
      setApiKeyLoadingState('finished');
    }
  };

  const deleteApiKey = async (
    params: ApiKeyServiceDeleteRequest,
    onSuccess?: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    setApiKeyLoadingState('loading');

    try {
      await apiKeyClient.deleteApiKey(params);

      setApiKeys((prevApiKeys) =>
        prevApiKeys.filter((apiKey) => apiKey.apiKeyId !== params.apiKeyId),
      );

      onSuccess?.();
    } catch (error: any) {
      console.log('Failed to delete the Api Key', error);
      onError?.(error);
    } finally {
      setApiKeyLoadingState('finished');
    }
  };

  return {
    apiKeyToken,
    apiKeyLoadingState,

    apiKeys,
    apiKeysLoadingState,

    listApiKeys,
    createApiKey,
    updateApiKey,
    regenerateApiKey,
    deleteApiKey,
  };
};
