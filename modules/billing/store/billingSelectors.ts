import { DefaultValue, RecoilState, selector, selectorFamily } from 'recoil';
import { billingAtoms, SUBSCRIPTION_TYPES } from '@modules/billing';
import {
  CustomerBillingAddress,
  Item,
  Subscription,
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

const subscriptions = SUBSCRIPTION_TYPES.reduce((acc, type) => {
  acc[type] = selector<Subscription | null>({
    key: `billing.subscription.${type}`,
    get: ({ get }) => get(billingAtoms.billing).subscriptions[type],
    set: ({ set }, newValue) =>
      set(billingAtoms.billing, (prevState) =>
        newValue instanceof DefaultValue
          ? {
              customer: null,
              subscriptions: {
                'hosted-nodes': null,
                'self-managed-hosts': null,
                'fully-managed-hosts': null,
              },
            }
          : {
              ...prevState,
              subscriptions: {
                ...prevState.subscriptions,
                [type]: newValue,
              },
            },
      ),
  });
  return acc;
}, {} as Record<string, RecoilState<Subscription | null>>);

const subscriptionById = selectorFamily<Subscription | null, string>({
  key: 'billing.subscription.byId',
  get:
    (id) =>
    ({ get }) => {
      const billing = get(billingAtoms.billing);

      for (const subscription of Object.values(billing.subscriptions)) {
        if (subscription?.id === id) {
          return subscription;
        }
      }
      return null;
    },
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
  subscriptions,
  subscriptionById,
};
