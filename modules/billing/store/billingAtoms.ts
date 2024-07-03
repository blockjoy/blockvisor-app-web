import { atom, atomFamily, selector } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';
import { Address } from '@stripe/stripe-js';
import { authAtoms } from '@modules/auth';
import {
  OrgServiceBillingDetailsResponse,
  PaymentMethod,
} from '@modules/grpc/library/blockjoy/v1/org';

export const bypassBillingForSuperUser = atomFamily<boolean, boolean>({
  key: 'billing.superUser',
  default: false,
  effects: (isSuperUser) => {
    return isSuperUser
      ? [localStorageEffect('billing.bypassBillingForSuperUser', false)]
      : [];
  },
});

const billing = atom<{
  identity: {
    id: string | null;
  };
  customer: any | null | any;
  subscription: OrgServiceBillingDetailsResponse | null;
}>({
  key: 'billing',
  default: {
    identity: {
      id: null,
    },
    customer: null,
    subscription: null,
  },
  effects: [localStorageEffect('billing')],
});

const billingContacts = atom<any | null>({
  key: 'billing.contacts',
  default: null,
});

const billingContactsLoadingState = atom<LoadingState>({
  key: 'billing.contacts.loadingState',
  default: 'initializing',
});

const customerLoadingState = atom<LoadingState>({
  key: 'billing.customer.loadingState',
  default: 'finished',
});

const paymentMethods = atom<PaymentMethod[]>({
  key: 'billing.paymentMethods',
  default: [],
  effects: [localStorageEffect('billing.paymentMethods')],
});

const paymentMethodsLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethods.loadingState',
  default: 'finished',
});

const paymentMethod = atom<PaymentMethod | null>({
  key: 'billing.paymentMethod',
  default: null,
});

const paymentMethodError = atom<PaymentError | null>({
  key: 'billing.paymentMethod.error',
  default: null,
});

const paymentMethodLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethod.loadingState',
  default: 'finished',
});

const billingAddressLoadingState = atom<LoadingState>({
  key: 'billing.billingAddress.loadingState',
  default: 'finished',
});

const estimates = atom<any | null>({
  key: 'billing.estimates',
  // TODO: Mock data
  default: [],
});

const estimatesLoadingState = atom<LoadingState>({
  key: 'billing.estimates.loadingState',
  default: 'finished',
});

const invoices = atom<any[]>({
  key: 'billing.invoices',
  default: [],
});

const invoicesLoadingState = atom<LoadingState>({
  key: 'billing.invoices.loadingState',
  default: 'finished',
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
  default: 'finished',
});

const subscriptionPaymentMethodLoadingState = atom<LoadingState>({
  key: 'billing.subscription.paymentMethod.loadingState',
  default: 'finished',
});

const promoCode = atom<any | null>({
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

const cardHolder = atom<{ firstName: string; lastName: string }>({
  key: 'billing.card.holder',
  default: selector({
    key: 'billing.card.holder.default',
    get: ({ get }) => {
      const user = get(authAtoms.user);

      return {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
      };
    },
  }),
});

const cardAddress = atom<Address>({
  key: 'billing.card.address',
  default: selector({
    key: 'billing.card.address.default',
    get: ({ get }) => {
      const customer = get(billingAtoms.billing)?.customer;

      // TODO-BILLING: remove as Address
      // const { city, country, line1, line2, postal_code, state } =
      //   customer?.address! as Address;

      return {
        city: '',
        country: '',
        line1: '',
        line2: '',
        postal_code: '',
        state: '',
      };
    },
  }),
});

const isValidCard = atom<boolean>({
  key: 'billing.card.isValid',
  default: false,
});

export const billingAtoms = {
  bypassBillingForSuperUser,

  billing,

  billingContacts,
  billingContactsLoadingState,

  billingAddressLoadingState,
  customerLoadingState,

  estimates,
  estimatesLoadingState,

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

  promoCode,
  promoCodeError,
  promoCodeLoadingState,

  cardHolder,
  cardAddress,

  isValidCard,
};
