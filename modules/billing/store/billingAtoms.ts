import { atom } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';

const creditCard = atom<ICreditCard | null>({
  key: 'billing.creditCard',
  default: null,
  effects: [localStorageEffect('creditCard')],
});

const creditCardLoadingState = atom<LoadingState>({
  key: 'billing.creditCard.loadingState',
  default: 'finished',
});

const billingAddress = atom<IBillingAddress | null>({
  key: 'billing.billingAddress',
  default: null,
  effects: [localStorageEffect('billingAddress')],
});

const billingAddressLoadingState = atom<LoadingState>({
  key: 'billing.billingAddress.loadingState',
  default: 'initializing',
});

const billingContacts = atom<IBillingContact[]>({
  key: 'billing.contacts',
  default: [],
  effects: [localStorageEffect('billingContacts')],
});

const billingContactsLoadingState = atom<LoadingState>({
  key: 'billing.contacts.loadingState',
  default: 'initializing',
});

const invoice = atom<IInvoice | null>({
  key: 'billing.invoice',
  default: null,
  effects: [localStorageEffect('invoice')],
});

const invoiceLoadingState = atom<LoadingState>({
  key: 'billing.invoice.loadingState',
  default: 'finished',
});

const invoices = atom<IInvoice[]>({
  key: 'billing.invoices',
  default: [],
  effects: [localStorageEffect('invoices')],
});

const invoicesLoadingState = atom<LoadingState>({
  key: 'billing.invoices.loadingState',
  default: 'finished',
});

const plans = atom<IPlan[] | null>({
  key: 'billing.plans',
  default: null,
  effects: [localStorageEffect('plans')],
});

const plansLoadingState = atom<LoadingState>({
  key: 'billing.plans.loadingState',
  default: 'finished',
});

const subscription = atom<ISubscription | null>({
  key: 'billing.subscription',
  default: null,
  effects: [localStorageEffect('subscription')],
});

const subscriptionLoadingState = atom<LoadingState>({
  key: 'billing.subscription.loadingState',
  default: 'finished',
});

export const billingAtoms = {
  creditCard,
  creditCardLoadingState,

  billingAddress,
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
