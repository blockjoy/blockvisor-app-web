import { readToken } from '@shared/utils/readToken';
import { Metadata } from 'nice-grpc-web';
import { authClient } from '../clients/authClient';

export const getIdentity = () => {
  if (!window.localStorage.getItem('identity')) return '';
  const identity = JSON.parse(window.localStorage.getItem('identity') || '{}');
  return identity;
};

export const getOptions = () => {
  return {
    metadata: Metadata({
      authorization: `Bearer ${getIdentity().accessToken}`,
    }),
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
    // TODO: Move to separate localStorage var to avoid JSON.parse to retrive it
    parsedIdentity.accessTokenExpires = readToken(token);
    const updatedIdentityString = JSON.stringify(parsedIdentity);
    localStorage.setItem('identity', updatedIdentityString);
  }
};

export const callWithTokenRefresh = async (
  method: (...args: any[]) => Promise<any>,
  ...args: any[]
): Promise<any> => {
  try {
    await authClient.refreshToken();
    return await method(...args, getOptions());
  } catch (err) {
    return handleError(err);
  }
};
