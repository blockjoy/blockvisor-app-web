import { User as ApiUser } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { authAtoms } from '@modules/auth/store/authAtoms';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';

type Loading = 'loading' | 'done' | 'initializing';

export const useIdentity = () => {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const [status, setStatus] = useState<Loading>('initializing');
  const repository = useIdentityRepository();

  const signOut = () => {
    setStatus('loading');
    repository?.deleteIdentity();
    setStatus('done');
  };

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

  const checkUser = () => {
    setStatus('loading');
    const user = repository?.getIdentity();

    if (user) {
      setUser(user);
    }
    setStatus('done');
  };

  useEffect(() => {
    checkUser();
  }, []);

  return {
    isLoggedIn: Boolean(repository?.getIdentity()?.accessToken),
    isVerified: Boolean(repository?.getIdentity()?.verified),
    isLoading: status === 'initializing' || status === 'loading',
    isDone: status === 'done',
    user,
    status,
    editUser,
    signOut,
  };
};
