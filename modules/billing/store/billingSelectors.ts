import { selector, selectorFamily } from 'recoil';
import { billingAtoms } from '@modules/billing';
import {
  CustomerBillingAddress,
  Item,
} from 'chargebee-typescript/lib/resources';

const activePlan = selectorFamily<Item | null, string>({
  key: 'billing.plan.active',
  get:
    (planId) =>
    ({ get }) => {
      const plans = get(billingAtoms.items);

      const activePlan = plans?.find((plan: Item) => plan.id === planId);
      return activePlan ?? null;
    },
});

const customer = selector({
  key: 'billing.customer',
  get: ({ get }) => get(billingAtoms.billing).customer,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      customer: newValue,
    })),
});

const subscription = selector({
  key: 'billing.subscription',
  get: ({ get }) => get(billingAtoms.billing).subscription,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      subscription: newValue,
    })),
});

const billingAddress = selector<CustomerBillingAddress | null>({
  key: 'billing.billingAddress',
  get: ({ get }) => {
    const customerVal = get(customer);

    if (!customerVal) return null;

    const billingAddress = customerVal.billing_address;
    if (!billingAddress) return null;

    return billingAddress;
  },
});

export const billingSelectors = {
  activePlan,
  billingAddress,
  customer,
  subscription,
};
