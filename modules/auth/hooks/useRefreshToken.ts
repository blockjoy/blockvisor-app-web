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

  let refreshInterval: ReturnType<typeof setInterval> | null = null;
  let isRefreshing = false;

  const refreshToken = async () => {
    if (isRefreshing) return;
    isRefreshing = true;

    const identity = repository?.getIdentity();
    const user: any = readToken(identity?.accessToken!);

    const expirationTime = user.exp;
    let callTime = expirationTime * 1000 - Date.now();

    if (callTime <= 0) {
      callTime = 1000;
      await handleTokenRefresh();
    }

    if (refreshInterval) clearInterval(refreshInterval);

    refreshInterval = setInterval(handleTokenRefresh, callTime);
    isRefreshing = false;
  };

  const removeRefreshTokenCall = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  };

  const handleTokenRefresh = async (): Promise<void> => {
    const accessToken = await authClient.refreshToken();

    if (accessToken)
      setUser((user) => ({
        ...user,
        accessToken,
      }));
  };

  return {
    refreshToken,
    removeRefreshTokenCall,
  };
};
