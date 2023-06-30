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
  localStorage.setItem('accessTokenExpiry', readToken(token).exp);
  const identity = getIdentity();
  if (identity) {
    const parsedIdentity = JSON.parse(identity);
    parsedIdentity.accessToken = token;
    const updatedIdentityString = JSON.stringify(parsedIdentity);
    window.localStorage.setItem('identity', updatedIdentityString);
  } else {
    window.localStorage.setItem(
      'identity',
      JSON.stringify({
        accessToken: token,
      }),
    );
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

export const checkForRefreshTokenError = (message: string) => {
  // TODO: Investigate token mismatch BS
  if (message.includes('Refresh')) {
    localStorage.clear();
    window.location.href = '';
  }
};
