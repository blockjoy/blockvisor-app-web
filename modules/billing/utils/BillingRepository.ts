import { BrowserStorage } from '@modules/auth';
import { Customer, Subscription } from 'chargebee-typescript/lib/resources';

type BillingIdentityType = 'updateCustomer' | 'updateSubscription';
type BillingIdentityPayload =
  | { customer: Customer }
  | { subscription: Subscription }
  | any;

export class BillingRepository {
  private _key = 'billing';
  private _storage: BrowserStorage<any>;

  constructor(storage: BrowserStorage<any>) {
    this._storage = storage;
  }

  public getIdentity = () => this._storage.get(this._key);

  public updateIdentity = (action: {
    type: BillingIdentityType;
    payload: BillingIdentityPayload;
  }) => {
    const { type, payload } = action;

    const data = this._storage.get(this._key) ?? {};
    let newData = data;

    switch (type) {
      case 'updateCustomer':
        const { customer }: BillingIdentityPayload = payload;
        newData = {
          ...data,
          customer,
        };
        break;
      default:
        break;
    }

    this._storage.save(this._key, newData);
  };
}
