import { useRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { useIdentityRepository } from './useIdentityRepository';
import { userClient } from '@modules/grpc';
import { ApplicationError } from '../utils/Errors';

export function useEditUser() {
  const [, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const editUser = async (
    firstName: string,
    lastName: string,
    userId: string,
  ) => {
    try {
      const response = await userClient.updateUser({
        userId,
        firstName,
        lastName,
      });
      setUser((current: any) => ({ ...current, ...response }));
      repository?.updateIdentity({ ...response });
    } catch (err: any) {
      throw new ApplicationError('EditUserError', err);
    }
  };

  return editUser;
}
