import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useMemo } from 'react';
import { BrowserStorage } from '../utils/BrowserStorage';
import { IdentityRepository } from '../utils/IdentityRepository';

export function useIdentityRepository() {
  const isBrowser = () => typeof window !== 'undefined';

  const repository = useMemo(() => {
    if (isBrowser()) {
      const storage = new BrowserStorage<User>(localStorage, JSON);
      return new IdentityRepository(storage);
    }
  }, []);

  return repository;
}
