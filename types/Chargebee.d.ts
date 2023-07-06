import {
  Subscription as OriginalSubscription,
  Customer as OriginalCustomer,
} from 'chargebee-typescript/lib/resources';

declare module 'chargebee-typescript/lib/resources' {
  interface Subscription extends OriginalSubscription {
    cf_plan?: string;
    cf_organization_id?: string;
  }
}
