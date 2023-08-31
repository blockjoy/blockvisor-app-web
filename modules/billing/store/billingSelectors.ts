import { selector, selectorFamily } from 'recoil';
import {
  Customer,
  CustomerBillingAddress,
  PaymentSource,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { billingAtoms } from '@modules/billing';
import { Subscription as UserSubscription } from '@modules/grpc/library/blockjoy/v1/subscription';

const billingId = selector<string | null>({
  key: 'billing.identity.id',
  get: ({ get }) => get(billingAtoms.billing)?.identity?.id,
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
  get: ({ get }) => get(billingAtoms.billing)?.identity?.subscription,
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
  get: ({ get }) => get(billingAtoms.billing)?.customer,
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

const paymentMethodById = selectorFamily<PaymentSource | null, string>({
  key: 'billing.paymentMethodById',
  get:
    (paymentSourceId: string) =>
    ({ get }) => {
      if (!paymentSourceId) return null;

      const paymentMethods = get(billingAtoms.paymentMethods);
      if (!paymentMethods || !paymentMethods.length) return null;

      const selectedPaymentMethod = paymentMethods.find(
        (paymentMethod: PaymentSource) => paymentMethod.id === paymentSourceId,
      );

      return selectedPaymentMethod || null;
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

const hasBillingAddress = selector<boolean>({
  key: 'billing.hasBillingAddress',
  get: ({ get }) => {
    const customerVal = get(customer);
    if (!customerVal) return false;

    const billingAddress = customerVal.billing_address;
    if (!billingAddress) return false;

    return true;
  },
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
    const subscription = get(billingAtoms.billing)?.identity?.subscription;

    return subscription !== null;
  },
});

export const billingSelectors = {
  billingId,
  userSubscription,

  customer,
  subscription,

  billingAddress,
  paymentMethodById,

  hasBillingAddress,
  hasPaymentMethod,
  hasSubscription,
};
