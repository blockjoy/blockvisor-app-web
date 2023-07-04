import { useIdentityRepository } from './useIdentityRepository';

export function useSignOut() {
  const repository = useIdentityRepository();
  const removeBilling = () => localStorage.removeItem('billing');

  const signOut = () => {
    repository?.deleteIdentity();
    removeBilling();
    // TOOD: improve sign out so it doesn't reset the app
    window.location.href = '/';
  };

  return signOut;
}
