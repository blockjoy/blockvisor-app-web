import { BrowserStorage } from './BrowserStorage';

export class IdentityRepository {
  private _key = 'identity';
  private _storage: BrowserStorage<User>;
  constructor(storage: BrowserStorage<User>) {
    this._storage = storage;
  }
  public get = () => this._storage.get(this._key);
  public save = (user: User) => {
    this._storage.save(this._key, user);
  };
  public update = (user: User) => {
    const data = this._storage.get(this._key);
    if (data) {
      const updatedUser = {
        ...data,
        ...user,
      };
      this._storage.save(this._key, updatedUser);
    }
  };
  public delete = () => {
    this._storage.delete(this._key);
  };
}
