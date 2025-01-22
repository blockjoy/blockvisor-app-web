import { atom } from 'recoil';
import {
  ApiKeyServiceCreateResponse,
  ApiKeyServiceRegenerateResponse,
  ListApiKey,
} from '@modules/grpc/library/blockjoy/v1/api_key';

const appLoadingState = atom<LoadingState>({
  key: 'settings.app.loadingState',
  default: 'finished',
});

const apiKey = atom<ListApiKey | null>({
  key: 'settings.apiKey',
  default: null,
});

const apiKeyLoadingState = atom<LoadingState>({
  key: 'settings.apiKey.loadingState',
  default: 'finished',
});

const apiKeyToken = atom<
  ApiKeyServiceCreateResponse | ApiKeyServiceRegenerateResponse | null
>({
  key: 'settings.apiKey.token',
  default: null,
});

const apiKeys = atom<ListApiKey[]>({
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
