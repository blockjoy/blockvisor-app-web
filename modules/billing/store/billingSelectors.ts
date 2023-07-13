import { selector, selectorFamily } from 'recoil';
import { billingAtoms } from '@modules/billing';
import {
  Customer,
  CustomerBillingAddress,
  Item,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { organizationAtoms } from '@modules/organization';
import { Subscription as UserSubscription } from '@modules/grpc/library/blockjoy/v1/subscription';

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

const billingId = selector<string | null>({
  key: 'billing.identity.id',
  get: ({ get }) => get(billingAtoms.billing).identity.id,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      identity: {
        ...prevState.identity,
        id: newValue,
      },
    })),
});

const userSubscription = selector<UserSubscription | null>({
  key: 'billing.identity.subscription',
  get: ({ get }) => get(billingAtoms.billing).identity.subscription,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      identity: {
        ...prevState.identity,
        subscription: newValue,
      },
    })),
});

const customer = selector<Customer | null>({
  key: 'billing.customer',
  get: ({ get }) => get(billingAtoms.billing).customer,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      customer: newValue,
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

const subscription = selector<Subscription | null>({
  key: 'billing.subscription',
  get: ({ get }) => get(billingAtoms.billing).subscription,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      subscription: newValue,
    })),
});

const hasPaymentMethod = selector<boolean>({
  key: 'billing.hasPaymentMethod',
  get: ({ get }) => {
    const customer = get(billingAtoms.billing).customer;
    if (!customer) return false;
    if (!customer?.primary_payment_source_id) return false;

    return true;
  },
});

const hasSubscription = selector<boolean>({
  key: 'billing.hasSubscription',
  get: ({ get }) => {
    const defaultOrganization = get(organizationAtoms.defaultOrganization);
    const subscription = get(billingAtoms.billing).subscription;

    return (
      subscription?.status === 'active' &&
      subscription.cf_organization_id === defaultOrganization?.id
    );
  },
});

export const billingSelectors = {
  activePlan,
  billingAddress,
  billingId,
  userSubscription,
  customer,
  hasPaymentMethod,
  subscription,
  hasSubscription,
};
