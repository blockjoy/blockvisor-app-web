import { BrowserStorage } from './BrowserStorage';

export class IdentityRepository {
  private _key = 'identity';
  private _hostProvisionsKey = 'hostProvisionKeys';
  private _storage: BrowserStorage<User>;

  constructor(storage: BrowserStorage<User>) {
    this._storage = storage;
  }

  public getIdentity = () => this._storage.get(this._key);

  public saveIdentity = (user: User) => {
    this._storage.save(this._key, user);
  };

  public updateIdentity = (user: User) => {
    const data = this._storage.get(this._key);
    if (data) {
      const updatedUser = {
        ...data,
        ...user,
      };
      this._storage.save(this._key, updatedUser);
    }
  };
  public deleteIdentity = () => {
    this._storage.delete(this._key);
    this._storage.delete(this._hostProvisionsKey);
  };

  public getDefaultOrganization = () => {
    return this._storage.get(this._key)?.defaultOrganization;
  };

  public saveDefaultOrganization = (name: string, id: string) => {
    const data = this._storage.get(this._key);

    if (data) {
      const newData: User = {
        ...data,
        defaultOrganization: { name, id },
      };
      this._storage.save(this._key, newData);
    }
  };
}
