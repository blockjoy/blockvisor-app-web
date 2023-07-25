import { atom } from 'recoil';
import {
  Contact,
  Customer,
  Estimate,
  Invoice,
  Item,
  ItemPrice,
  PaymentSource,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { localStorageEffect } from 'utils/store/persist';
import { Subscription as UserSubscription } from '@modules/grpc/library/blockjoy/v1/subscription';

const billing = atom<{
  identity: {
    id: string | null;
    subscription: UserSubscription | null;
  };
  customer: Customer | null;
  subscription: Subscription | null;
}>({
  key: 'billing',
  default: {
    identity: {
      id: null,
      subscription: null,
    },
    customer: null,
    subscription: null,
  },
  effects: [localStorageEffect('billing')],
});

const customerLoadingState = atom<LoadingState>({
  key: 'billing.customer.loadingState',
  default: 'finished',
});

const paymentMethods = atom<PaymentSource[]>({
  key: 'billing.paymentMethods',
  default: [],
});

const paymentMethodsLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethods.loadingState',
  default: 'initializing',
});

const paymentMethod = atom<PaymentSource | null>({
  key: 'billing.paymentMethod',
  default: null,
});

const paymentMethodError = atom<PaymentError | null>({
  key: 'billing.paymentMethod.error',
  default: null,
});

const paymentMethodLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethod.loadingState',
  default: 'initializing',
});

const billingAddressLoadingState = atom<LoadingState>({
  key: 'billing.billingAddress.loadingState',
  default: 'finished',
});

const billingContacts = atom<Contact[]>({
  key: 'billing.contacts',
  default: [],
});

const billingContactsLoadingState = atom<LoadingState>({
  key: 'billing.contacts.loadingState',
  default: 'finished',
});

const invoice = atom<Invoice | null>({
  key: 'billing.invoice',
  default: null,
});

const invoiceLoadingState = atom<LoadingState>({
  key: 'billing.invoice.loadingState',
  default: 'initializing',
});

const invoices = atom<Invoice[]>({
  key: 'billing.invoices',
  default: [],
});

const invoicesLoadingState = atom<LoadingState>({
  key: 'billing.invoices.loadingState',
  default: 'initializing',
});

const invoicesNextOffset = atom<string | undefined>({
  key: 'billing.invoices.nextOffset',
  default: undefined,
});

const preloadInvoices = atom<number>({
  key: 'billing.invoices.preload',
  default: 0,
});

const items = atom<Item[] | null>({
  key: 'billing.items',
  default: null,
});

const itemsLoadingState = atom<LoadingState>({
  key: 'billing.items.loadingState',
  default: 'initializing',
});

const itemPrices = atom<ItemPrice[] | null>({
  key: 'billing.items.prices',
  default: null,
});

const itemPricesLoadingState = atom<LoadingState>({
  key: 'billing.items.prices.loadingState',
  default: 'initializing',
});

const estimate = atom<Estimate | null>({
  key: 'billing.estimate',
  default: null,
});

const estimateLoadingState = atom<LoadingState>({
  key: 'billing.estimate.loadingState',
  default: 'initializing',
});

const subscriptionLoadingState = atom<LoadingState>({
  key: 'billing.subscription.loadingState',
  default: 'initializing',
});

export const billingAtoms = {
  billing,

  customerLoadingState,

  paymentMethod,
  paymentMethodLoadingState,
  paymentMethodError,

  paymentMethods,
  paymentMethodsLoadingState,

  billingAddressLoadingState,

  billingContacts,
  billingContactsLoadingState,

  estimate,
  estimateLoadingState,

  items,
  itemsLoadingState,

  itemPrices,
  itemPricesLoadingState,

  invoice,
  invoiceLoadingState,
  invoices,
  invoicesLoadingState,
  invoicesNextOffset,
  preloadInvoices,

  subscriptionLoadingState,
};
