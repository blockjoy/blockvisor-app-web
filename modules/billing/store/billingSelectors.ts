import { selector } from 'recoil';
import { billingAtoms } from './billingAtoms';

const isAddedCreditCard = selector<boolean>({
  key: 'billing.creditCard.isAdded',
  get: ({ get }) => {
    const creditCard = get(billingAtoms.creditCard);

    return creditCard !== null;
  },
});

export const billingSelectors = {
  isAddedCreditCard,
};
