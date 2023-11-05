import { selector, selectorFamily } from 'recoil';
import {
  Customer,
  CustomerBillingAddress,
  PaymentSource,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { ItemPriceSimple, billingAtoms } from '@modules/billing';
import { Subscription as UserSubscription } from '@modules/grpc/library/blockjoy/v1/subscription';
import { nodeAtoms } from '@modules/node';

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

const selectedItemPrice = selector<ItemPriceSimple | null>({
  key: 'billing.selectedItemPrice',
  get: ({ get }) => {
    const itemPrices = get(billingAtoms.itemPrices);
    if (!itemPrices?.length) return null;

    const selectedSKU = get(nodeAtoms.selectedSKU);
    if (!selectedSKU) return null;

    const subscriptionVal = get(subscription);
    const billingPeriodUnit = subscriptionVal?.billing_period_unit ?? 'month';

    const itemPrice = itemPrices.find(
      (itemPrice: ItemPriceSimple) =>
        itemPrice.item_id === selectedSKU &&
        itemPrice.period_unit === billingPeriodUnit,
    );

    return itemPrice || null;
  },
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

const isActiveSubscription = selector<boolean>({
  key: 'billing.subscription.isActive',
  get: ({ get }) => {
    const subscriptionVal = get(subscription);
    if (!subscriptionVal) return false;

    return subscriptionVal?.status === 'active';
  },
});

const canCreateResources = selector<boolean>({
  key: 'billing.resources.canCreate',
  get: ({ get }) => {
    const hasSubscriptionVal = get(hasSubscription);
    const isActiveSubscriptionVal = get(isActiveSubscription);
    const hasPaymentMethodVal = get(hasPaymentMethod);

    const canCreate =
      hasPaymentMethodVal && hasSubscriptionVal && isActiveSubscriptionVal;

    return canCreate || false;
  },
});

export const billingSelectors = {
  billingId,
  userSubscription,

  customer,
  subscription,

  selectedItemPrice,

  billingAddress,
  paymentMethodById,

  hasBillingAddress,
  hasPaymentMethod,
  hasSubscription,
  isActiveSubscription,
  canCreateResources,
};
