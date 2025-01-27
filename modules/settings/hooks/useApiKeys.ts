import { useRecoilState } from 'recoil';
import {
  ApiKeyServiceCreateRequest,
  ApiKeyServiceDeleteRequest,
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
      onError?.('Error creating the api key, please try again.');
      setApiKeyToken(null);
    } finally {
      setApiKeyLoadingState('finished');
    }
  };

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
      onError?.('Failed to delete the Api Key');
    } finally {
      setApiKeyLoadingState('finished');
    }
  };

  return {
    apiKeyToken,
    apiKeyLoadingState,

    apiKeys,
    apiKeysLoadingState,

    createApiKey,
    listApiKeys,
    deleteApiKey,
  };
};
