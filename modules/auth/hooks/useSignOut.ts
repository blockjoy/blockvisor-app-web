import { useIdentityRepository } from './useIdentityRepository';

export function useSignOut() {
  const repository = useIdentityRepository();

  const signOut = () => {
    repository?.deleteIdentity();
    // TOOD: improve sign out so it doesn't reset the app
    window.location.href = '/';
  };

  return signOut;
}
