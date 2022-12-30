import { useRecoilState } from 'recoil';
import { User as ApiUser } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { authAtoms } from '../store/authAtoms';
import { useIdentityRepository } from './useIdentityRepository';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organization';
import { ApplicationError } from '../utils/Errors';

export function useEditUser() {
  const [, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const editUser = async (firstName: string, lastName: string, id: string) => {
    const user = new ApiUser();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setId(id ?? '');

    const response: any = await apiClient.updateUser(user);

    if (isStatusResponse(response)) {
      throw new ApplicationError('EditUserError', response.message);
    } else {
      setUser((current) => ({ ...current, ...response }));
      repository?.updateIdentity({ ...response });
    }
  };

  return editUser;
}
