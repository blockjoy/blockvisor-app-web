import { useIdentityRepository } from './useIdentityRepository';

export function useSignOut() {
  const repository = useIdentityRepository();

  const signOut = () => {
    repository?.deleteIdentity();
  };

  return signOut;
}
