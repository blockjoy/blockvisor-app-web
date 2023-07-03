import { authClient, setTokenValue, userClient } from '@modules/grpc';
import { useSetRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';
import {
  isStatusResponse,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import { readToken } from '@shared/utils/readToken';

type SignInParams = {
  email: string;
  password: string;
};

export function useSignIn() {
  const setUser = useSetRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const { getOrganizations } = useGetOrganizations();

  //const { acceptInvitation, receivedInvitations } = useInvitations();

  const handleSuccess = async (
    accessToken: string,
    init?: boolean,
    isInvited?: boolean,
  ) => {
    // for grpc
    setTokenValue(accessToken);

    repository?.saveIdentity({
      accessToken,
    });

    const tokenObject: any = readToken(accessToken);
    const userId = tokenObject.resource_id;

    const userData: any = await userClient.getUser(userId);

    repository?.updateIdentity(userData);
    setUser((current) => ({
      ...current,
      ...userData,
      accessToken,
    }));

    if (init) {
      await getOrganizations(true);
    }

    // TODO: Need to get the invitation_id in token
    // if (isInvited) {
    //   console.log('receivedInvitations in useSignIn', receivedInvitations);
    //   if (receivedInvitations?.length === 1) {
    //     const invitation = receivedInvitations[0];
    //     await acceptInvitation(invitation.id);
    //   } else {
    //     console.log('NO RECEIVED INVITATIONS');
    //   }
    // }
  };

  const signIn = async (params?: SignInParams, token?: string) => {
    if (token) {
      await handleSuccess(token, true, true);
      return;
    }

    if (params) {
      const response = await authClient.login(params.email, params.password);
      if (!isStatusResponse(response)) {
        await handleSuccess(response!);
      } else {
        throw new ApplicationError('LoginError', 'Login Error');
      }
    } else {
      throw new ApplicationError('LoginError', 'Error signing in');
    }
  };

  return signIn;
}
