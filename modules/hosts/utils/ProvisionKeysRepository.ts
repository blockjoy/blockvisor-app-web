import { BrowserStorage } from '@modules/auth';

export class ProvisionKeysRepository {
  private _key = 'hostProvisionKeys';
  private _storage: BrowserStorage<string[]>;

  constructor(storage: BrowserStorage<string[]>) {
    this._storage = storage;
  }

  public getHostProvisionKeys = () => this._storage.get(this._key);

  public saveHostProvisionKeys = (keys: string[]) => {
    this._storage.save(this._key, keys);
  };

  public updateHostProvisionKeys = (keys: string[]) => {
    const data = this._storage.get(this._key);
    if (data) {
      const newKeys = new Set([...data, ...keys]);

      this._storage.save(this._key, Array.from(newKeys));
    }
  };
  public deleteHostProvisionKeys = () => {
    this._storage.delete(this._key);
  };
}
