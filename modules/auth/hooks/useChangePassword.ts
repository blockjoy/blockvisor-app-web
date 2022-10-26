import { apiClient } from '@modules/client';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';

export function useChangePassword() {
  const repository = useIdentityRepository();

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
      repository?.updateIdentity({ accessToken: response.value });
      apiClient.setTokenValue(response.value);
    } else {
      throw new ApplicationError(
        'ChangePasswordError',
        response?.message ?? '',
      );
    }
  };

  return changePassword;
}
