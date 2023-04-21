import { authClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { readToken } from '@shared/utils/readToken';
import { useRecoilValue } from 'recoil';
import { useIdentityRepository } from './useIdentityRepository';

interface Hook {
  refreshToken: VoidFunction;
  removeRefreshTokenCall: VoidFunction;
}

export const useRefreshToken = (): Hook => {
  const repository = useIdentityRepository();
  const orgId = useRecoilValue(organizationAtoms.defaultOrganization);

  let refreshInterval: ReturnType<typeof setInterval>;

  const refreshToken = () => {
    const identity = repository?.getIdentity();
    const user: any = readToken(identity?.accessToken!);

    const expirationTime = user.exp;
    const callTime = expirationTime * 1000 + 100 - Date.now();

    refreshInterval = setInterval(async (): Promise<void> => {
      // TODO
      //await apiClient.getDashboardMetrics(orgId?.id);
    }, callTime);
  };

  const removeRefreshTokenCall = () => {
    clearInterval(refreshInterval);
  };

  return {
    refreshToken,
    removeRefreshTokenCall,
  };
};
