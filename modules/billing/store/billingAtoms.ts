import {
  Contact,
  Customer,
  Invoice,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { atom } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';

const customer = atom<Customer | null>({
  key: 'billing.customer',
  default: null,
  effects: [localStorageEffect('customer')],
});

const customerLoadingState = atom<LoadingState>({
  key: 'billing.customer.loadingState',
  default: 'finished',
});

const creditCard = atom<ICreditCard | null>({
  key: 'billing.creditCard',
  default: null,
  effects: [localStorageEffect('creditCard')],
});

const creditCardLoadingState = atom<LoadingState>({
  key: 'billing.creditCard.loadingState',
  default: 'finished',
});

const paymentMethods = atom<any | null>({
  key: 'billing.paymentMethods',
  default: null,
});

const paymentMethodsLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethods.loadingState',
  default: 'initializing',
});

const billingAddressLoadingState = atom<LoadingState>({
  key: 'billing.billingAddress.loadingState',
  default: 'finished',
});

const billingContacts = atom<Contact[]>({
  key: 'billing.contacts',
  default: [],
  effects: [localStorageEffect('billingContacts')],
});

const billingContactsLoadingState = atom<LoadingState>({
  key: 'billing.contacts.loadingState',
  default: 'initializing',
});

const invoice = atom<Invoice | null>({
  key: 'billing.invoice',
  default: null,
});

const invoiceLoadingState = atom<LoadingState>({
  key: 'billing.invoice.loadingState',
  default: 'finished',
});

const invoices = atom<Invoice[]>({
  key: 'billing.invoices',
  default: [],
});

const invoicesLoadingState = atom<LoadingState>({
  key: 'billing.invoices.loadingState',
  default: 'finished',
});

const plans = atom<IPlan[] | null>({
  key: 'billing.plans',
  default: null,
});

const plansLoadingState = atom<LoadingState>({
  key: 'billing.plans.loadingState',
  default: 'finished',
});

const subscription = atom<Subscription | null>({
  key: 'billing.subscription',
  default: null,
  effects: [localStorageEffect('subscription')],
});

const subscriptionLoadingState = atom<LoadingState>({
  key: 'billing.subscription.loadingState',
  default: 'finished',
});

const chargebee = atom<any>({
  key: 'billing.chargebee',
  default: null,
});

export const billingAtoms = {
  chargebee,
  customer,
  customerLoadingState,

  creditCard,
  creditCardLoadingState,

  paymentMethods,
  paymentMethodsLoadingState,

  billingAddressLoadingState,

  billingContacts,
  billingContactsLoadingState,

  plans,
  plansLoadingState,

  invoice,
  invoiceLoadingState,
  invoices,
  invoicesLoadingState,

  subscription,
  subscriptionLoadingState,
};
