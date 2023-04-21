import { useSignIn } from '@modules/auth';
import { authClient } from '@modules/grpc';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';

export function useChangePassword() {
  const signIn = useSignIn();

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    const response = await authClient.updatePassword({
      old_pwd: currentPassword,
      new_pwd: newPassword,
      new_pwd_confirmation: confirmPassword,
    });
    if (response) {
      const accessToken = Buffer.from(response?.toString(), 'binary').toString(
        'base64',
      );
      signIn(undefined, accessToken);
    } else {
      throw new ApplicationError(
        'ChangePasswordError',
        'Change Password Error',
      );
    }
  };

  return changePassword;
}
