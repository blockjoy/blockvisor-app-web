import { authAtoms } from '@modules/auth';
import { apiClient } from '@modules/client';
import { useSetRecoilState } from 'recoil';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';

export function useChangePassword() {
  const repository = useIdentityRepository();

  const setUser = useSetRecoilState(authAtoms.user);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    const response = await apiClient.updatePassword({
      old_pwd: currentPassword,
      new_pwd: newPassword,
      new_pwd_confirmation: confirmPassword,
    });

    if (isSuccess(response)) {
      const accessToken = Buffer.from(
        response?.value?.toString(),
        'binary',
      ).toString('base64');

      apiClient.setTokenValue(response.value);
      repository?.saveIdentity({
        accessToken,
        verified: true,
      });
    } else {
      throw new ApplicationError(
        'ChangePasswordError',
        response?.message ?? '',
      );
    }
  };

  return changePassword;
}
