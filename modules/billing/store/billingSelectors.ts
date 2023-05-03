import { selector, selectorFamily } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { CustomerBillingAddress } from 'chargebee-typescript/lib/resources';

const activePlan = selectorFamily<IPlan | null, string>({
  key: 'billing.plan.active',
  get:
    (planId) =>
    ({ get }) => {
      const plans = get(billingAtoms.plans);

      const activePlan = plans?.find((plan: IPlan) => plan.id === planId);

      return activePlan ?? null;
    },
});

const billingAddress = selector<CustomerBillingAddress | null>({
  key: 'billing.billingAddress',
  get: ({ get }) => {
    const customer = get(billingAtoms.customer);

    if (!customer) return null;

    const billingAddress = customer.billing_address;
    if (!billingAddress) return null;

    return billingAddress;
  },
});

export const billingSelectors = {
  activePlan,
  billingAddress,
};
