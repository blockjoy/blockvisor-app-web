import { useSetRecoilState } from 'recoil';
import { authClient } from '@modules/grpc';
import { readToken } from '@shared/utils/readToken';
import { authAtoms, useIdentityRepository } from '@modules/auth';

interface Hook {
  refreshToken: VoidFunction;
  removeRefreshTokenCall: VoidFunction;
}

export const useRefreshToken = (): Hook => {
  const repository = useIdentityRepository();
  const setUser = useSetRecoilState(authAtoms.user);

  let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

  const refreshToken = async () => {
    const identity = repository?.getIdentity();
    const accessToken = identity?.accessToken
      ? readToken(identity.accessToken)
      : null;
    if (accessToken) scheduleTokenRefresh(accessToken.exp);
  };

  const scheduleTokenRefresh = (expirationTime: number) => {
    const callTime = Math.max(expirationTime * 1000 - Date.now() - 20000, 1000);

    if (refreshTimeout) clearTimeout(refreshTimeout);

    refreshTimeout = setTimeout(handleTokenRefresh, callTime);
  };

  const handleTokenRefresh = async () => {
    try {
      const accessToken = await authClient.refreshToken();
      if (accessToken) {
        setUser((user) => ({
          ...user,
          accessToken,
        }));

        const user = readToken(accessToken);
        scheduleTokenRefresh(user.exp);
      }
    } catch (error) {
      console.error('Error while refreshing the token', error);
    }
  };

  const removeRefreshTokenCall = () => {
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
      refreshTimeout = null;
    }
  };

  return {
    refreshToken,
    removeRefreshTokenCall,
  };
};
