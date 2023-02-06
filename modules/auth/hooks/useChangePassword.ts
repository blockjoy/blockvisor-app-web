import { useSignIn } from '@modules/auth';
import { apiClient } from '@modules/client';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';

export function useChangePassword() {
  const signIn = useSignIn();

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
      signIn(undefined, accessToken);
    } else {
      throw new ApplicationError(
        'ChangePasswordError',
        response?.message ?? '',
      );
    }
  };

  return changePassword;
}
