import { BrowserStorage } from '@modules/auth';
import { useRef } from 'react';
import { ProvisionKeysRepository } from '../utils/ProvisionKeysRepository';

export function useProvisionKeysRepository() {
  const isBrowser = () => typeof window !== 'undefined';

  const repository = useRef(
    isBrowser()
      ? new ProvisionKeysRepository(
          new BrowserStorage<string[]>(localStorage, JSON),
        )
      : null,
  );

  return repository.current;
}
