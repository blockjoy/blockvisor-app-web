import { atom, atomFamily, selector } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';
import {
  Invoice,
  OrgServiceBillingDetailsResponse,
  PaymentMethod,
} from '@modules/grpc/library/blockjoy/v1/org';
import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';
import { authAtoms } from '@modules/auth';
import { Amount } from '@modules/grpc/library/blockjoy/common/v1/currency';

export const bypassBillingForSuperUser = atomFamily<boolean, boolean>({
  key: 'billing.superUser',
  default: false,
  effects: (isSuperUser) => {
    return isSuperUser
      ? [localStorageEffect('billing.bypassBillingForSuperUser', false)]
      : [];
  },
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

const paymentMethodLoadingState = atom<LoadingState>({
  key: 'billing.paymentMethod.loadingState',
  default: 'finished',
});

const billingAddress = atom<Address | null>({
  key: 'billing.billingAddress',
  default: null,
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

const invoices = atom<Invoice[]>({
  key: 'billing.invoices',
  default: [],
});

const invoicesLoadingState = atom<LoadingState>({
  key: 'billing.invoices.loadingState',
  default: 'finished',
});

const subscription = atom<OrgServiceBillingDetailsResponse | null>({
  key: 'billing.subscription',
  default: null,
});

const subscriptionLoadingState = atom<LoadingState>({
  key: 'billing.subscription.loadingState',
  default: 'finished',
});

const subscriptionPaymentMethodLoadingState = atom<LoadingState>({
  key: 'billing.subscription.paymentMethod.loadingState',
  default: 'finished',
});

const price = atom<Amount | null>({
  key: 'billing.price',
  default: null,
});

const priceLoadingState = atom<LoadingState>({
  key: 'billing.price.loadingState',
  default: 'initializing',
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

const isValidCard = atom<boolean>({
  key: 'billing.card.isValid',
  default: false,
});

export const billingAtoms = {
  bypassBillingForSuperUser,

  subscription,
  subscriptionLoadingState,

  billingContacts,
  billingContactsLoadingState,

  billingAddress,
  billingAddressLoadingState,

  customerLoadingState,

  estimates,
  estimatesLoadingState,

  invoices,
  invoicesLoadingState,

  paymentMethod,
  paymentMethodLoadingState,

  paymentMethods,
  paymentMethodsLoadingState,

  subscriptionPaymentMethodLoadingState,

  price,
  priceLoadingState,

  promoCode,
  promoCodeError,
  promoCodeLoadingState,

  cardHolder,

  isValidCard,
};
