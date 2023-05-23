import { readToken } from '@shared/utils/readToken';
import { authClient } from '@modules/grpc';
import { Metadata } from 'nice-grpc-web';

export const getApiToken = () => {
  if (!window.localStorage.getItem('identity')) return '';
  const token = JSON.parse(
    window.localStorage.getItem('identity') || '{}',
  ).accessToken;
  return token;
};

export const getIdentity = () => {
  if (!window.localStorage.getItem('identity')) return '';
  const identity = JSON.parse(window.localStorage.getItem('identity') || '{}');
  return identity;
};

export const getOptions = () => {
  return {
    metadata: Metadata({ authorization: `Bearer ${getApiToken()}` }),
  };
};

export const handleError = (error: any) => {
  throw new Error(error?.toString());
};

export const setTokenValue = (token: string) => {
  const identity = localStorage.getItem('identity');
  if (identity) {
    const parsedIdentity = JSON.parse(identity);
    parsedIdentity.accessToken = token;
    const updatedIdentityString = JSON.stringify(parsedIdentity);
    localStorage.setItem('identity', updatedIdentityString);
  }
};
