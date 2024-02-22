import { atom, atomFamily } from 'recoil';
import {
  Customer,
  Estimate,
  Invoice,
  PaymentSource,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { localStorageEffect } from 'utils/store/persist';
import { Subscription as UserSubscription } from '@modules/grpc/library/blockjoy/v1/subscription';
import { ItemPriceSimple, PromoCode } from '@modules/billing';

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

const itemPrices = atom<ItemPriceSimple[] | null>({
  key: 'billing.items.prices',
  default: null,
});

const itemPricesLoadingState = atom<LoadingState>({
  key: 'billing.items.prices.loadingState',
  default: 'finished',
});

const paymentMethods = atom<PaymentSource[]>({
  key: 'billing.paymentMethods',
  default: [],
  effects: [localStorageEffect('billing.paymentMethods')],
});

const paymentMethodsLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethods.loadingState',
  default: 'finished',
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

const estimates = atom<Estimate | null>({
  key: 'billing.estimates',
  default: null,
});

const estimatesLoadingState = atom<LoadingState>({
  key: 'billing.estimates.loadingState',
  default: 'initializing',
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

const subscriptionLoadingState = atom<LoadingState>({
  key: 'billing.subscription.loadingState',
  default: 'initializing',
});

const subscriptionPaymentMethodLoadingState = atom<LoadingState>({
  key: 'billing.subscription.paymentMethod.loadingState',
  default: 'finished',
});

export const isSuperUserBilling = atomFamily<boolean, boolean>({
  key: 'billing.superUser',
  default: false,
  effects: (isSuperUser) => {
    return isSuperUser
      ? [localStorageEffect('billing.isSuperUser', false)]
      : [];
  },
});

const promoCode = atom<PromoCode | null>({
  key: 'billing.promoCode',
  default: null,
});

const promoCodeError = atom<string | null>({
  key: 'billing.promoCode.error',
  default: null,
});

const promoCodeLoadingState = atom<LoadingState>({
  key: 'billing.promoCode.loading',
  default: 'finished',
});

export const billingAtoms = {
  billing,

  billingAddressLoadingState,
  customerLoadingState,

  estimates,
  estimatesLoadingState,

  itemPrices,
  itemPricesLoadingState,

  invoice,
  invoiceLoadingState,
  invoices,
  invoicesLoadingState,
  invoicesNextOffset,
  preloadInvoices,

  paymentMethod,
  paymentMethodError,
  paymentMethodLoadingState,

  paymentMethods,
  paymentMethodsLoadingState,

  subscriptionLoadingState,

  subscriptionPaymentMethodLoadingState,

  isSuperUserBilling,

  promoCode,
  promoCodeError,
  promoCodeLoadingState,
};
