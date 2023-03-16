import { atom } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';

const creditCard = atom<ICreditCard | null>({
  key: 'billing.creditCard',
  default: null,
  effects: [localStorageEffect('creditCard')],
});

const creditCardLoadingState = atom<LoadingState>({
  key: 'billing.creditCard.loadingState',
  default: 'initializing',
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

export const billingAtoms = {
  creditCard,
  creditCardLoadingState,
  billingAddress,
  billingAddressLoadingState,
};
