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

export const checkTokenAndRefresh = async (token: string) => {
  const tokenObject = readToken(token);

  console.log('tokenExpiry', tokenObject.exp);
  console.log('currentDate', Math.round(new Date().getTime() / 1000));

  const currentDateTimestamp = Math.round(new Date().getTime() / 1000);

  if (tokenObject.exp > currentDateTimestamp) {
    console.log('Token is expired'!!!);
    const refreshTokenResponse = await authClient.refreshToken(token);
    console.log('New Token Expiry', readToken(refreshTokenResponse.token).exp);

    setTokenValue(refreshTokenResponse.token);
  }
};
