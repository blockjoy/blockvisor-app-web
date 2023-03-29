import { BrowserStorage } from '@modules/auth';
import { IdentityRepository } from '@modules/auth/utils/IdentityRepository';
import { expect, vi, it, describe, afterEach } from 'vitest';

afterEach(() => {
  global.localStorage.clear();
});

describe('Identity Repository', () => {
  it('should save a user object with the identity key', () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');

    const storage = new BrowserStorage<User>(global.localStorage, global.JSON);

    const repository = new IdentityRepository(storage);

    const mockedUser: User = {
      accessToken: 'dasd66dzahsdjakda',
      id: '123456',
    };
    repository.saveIdentity(mockedUser);

    expect(storageSpy).toHaveBeenCalledWith(
      'identity',
      '{"accessToken":"dasd66dzahsdjakda","id":"123456"}',
    );
  });

  it('should save the updated user', () => {
    const storage = new BrowserStorage<User>(global.localStorage, global.JSON);

    const repository = new IdentityRepository(storage);

    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');

    const mockedUser: User = {
      accessToken: 'dasd66dzahsdjakda',
      id: '123456',
    };
    repository.saveIdentity(mockedUser);

    const updatedUser: User = {
      accessToken: '1234',
      id: '567',
    };

    repository.updateIdentity(updatedUser);

    repository.getIdentity();
    expect(storageSpy).toHaveBeenCalledWith(
      'identity',
      '{"accessToken":"dasd66dzahsdjakda","id":"123456"}',
    );
  });

  it('should save default organization', () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    const storage = new BrowserStorage<User>(global.localStorage, global.JSON);

    const repository = new IdentityRepository(storage);

    const mockedUser: User = {
      accessToken: 'dasd66dzahsdjakda',
      id: '123456',
    };
    repository.saveIdentity(mockedUser);

    repository.saveDefaultOrganization('Default org', '1234');
    expect(storageSpy).toHaveBeenCalledWith(
      'identity',
      '{"accessToken":"dasd66dzahsdjakda","id":"123456","defaultOrganization":{"name":"Default org","id":"1234"}}',
    );
  });
});
