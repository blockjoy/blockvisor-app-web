export class BrowserStorage<T> {
  private _storage: Storage;
  private _json: JSON;
  constructor(browserStorage: Storage, json: JSON) {
    this._storage = browserStorage;
    this._json = json;
  }
  public save = (key: string, value: T) => {
    this._storage.setItem(key, this._json.stringify(value));
  };
  public delete = (key: string) => {
    this._storage.removeItem(key);
  };
  public get = (key: string): T | null => {
    const data = this._storage.getItem(key);
    if (data) {
      return this._json.parse(data);
    }
    return null;
  };
}
