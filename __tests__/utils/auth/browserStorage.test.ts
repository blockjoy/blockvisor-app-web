import { BrowserStorage } from '@modules/auth';
import { expect, vi, it, describe, afterEach } from 'vitest';

afterEach(() => {
  global.localStorage.clear();
});

describe('BrowserStorage', () => {
  it('should save an object with testKey to storage', () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');

    const storage = new BrowserStorage<Record<string, string>>(
      global.localStorage,
      global.JSON,
    );

    storage.save('testKey', { someKey: 'SomeValue' });
    expect(storageSpy).toHaveBeenCalledWith(
      'testKey',
      '{"someKey":"SomeValue"}',
    );
  });

  it('should remove an object with testKey from storage', () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'removeItem');

    const storage = new BrowserStorage<Record<string, string>>(
      global.localStorage,
      global.JSON,
    );

    storage.save('testKey', { someKey: 'SomeValue' });

    storage.delete('testKey');
    expect(storageSpy).toHaveBeenCalledWith('testKey');
  });

  it('should get an object with testKey from storage', () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'getItem');

    const storage = new BrowserStorage<Record<string, string>>(
      global.localStorage,
      global.JSON,
    );

    storage.save('testKey', { someKey: 'SomeValue' });

    storage.get('testKey');
    expect(storageSpy).toHaveBeenCalledWith('testKey');
  });
});
