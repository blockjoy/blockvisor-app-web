import { authClient } from '@modules/grpc';
import { ApplicationError } from '../utils/Errors';

export function useChangePassword() {
  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      await authClient.updatePassword({
        old_pwd: currentPassword,
        new_pwd: newPassword,
        new_pwd_confirmation: confirmPassword,
      });
    } catch (err) {
      throw new ApplicationError(
        'ChangePasswordError',
        'Change Password Error',
      );
    }
  };

  return changePassword;
}
