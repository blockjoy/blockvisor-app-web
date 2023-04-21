import { useRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { useIdentityRepository } from './useIdentityRepository';
import { userClient } from '@modules/grpc';
import { isStatusResponse } from '@modules/organization';
import { ApplicationError } from '../utils/Errors';

export function useEditUser() {
  const [, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const editUser = async (firstName: string, lastName: string, id: string) => {
    try {
      const response: any = await userClient.updateUser(
        id,
        firstName,
        lastName,
      );
      setUser((current) => ({ ...current, ...response }));
      repository?.updateIdentity({ ...response });
    } catch (err: any) {
      throw new ApplicationError('EditUserError', err);
    }
  };

  return editUser;
}
