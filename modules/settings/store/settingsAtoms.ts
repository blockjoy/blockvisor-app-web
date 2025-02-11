import { atom } from 'recoil';
import {
  ApiKeyServiceCreateResponse,
  ApiKey,
} from '@modules/grpc/library/blockjoy/v1/api_key';

const appLoadingState = atom<LoadingState>({
  key: 'settings.app.loadingState',
  default: 'finished',
});

const apiKey = atom<ApiKey | null>({
  key: 'settings.apiKey',
  default: null,
});

const apiKeyLoadingState = atom<LoadingState>({
  key: 'settings.apiKey.loadingState',
  default: 'finished',
});

const apiKeyToken = atom<ApiKeyServiceCreateResponse | null>({
  key: 'settings.apiKey.token',
  default: null,
});

const apiKeys = atom<ApiKey[]>({
  key: 'settings.apiKeys',
  default: [],
});

const apiKeysLoadingState = atom<LoadingState>({
  key: 'settings.apiKeys.loadingState',
  default: 'finished',
});

export const settingsAtoms = {
  appLoadingState,

  apiKeyToken,
  apiKey,
  apiKeyLoadingState,

  apiKeys,
  apiKeysLoadingState,
};
