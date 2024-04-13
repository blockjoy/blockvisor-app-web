import { selector, selectorFamily } from 'recoil';
import {
  Customer,
  CustomerBillingAddress,
  PaymentSource,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { Subscription as UserSubscription } from '@modules/grpc/library/blockjoy/v1/subscription';
import { ItemPriceSimple, billingAtoms } from '@modules/billing';
import { nodeAtoms } from '@modules/node';
import { computePricing } from '@shared/index';
import { authSelectors } from '@modules/auth';

const isEnabledBillingPreview = selector<boolean>({
  key: 'billing.preview.isEnabled',
  get: ({ get }) => {
    const isSuperUser = get(authSelectors.isSuperUser);
    const isEnabled = get(billingAtoms.isEnabledBillingPreview(isSuperUser));

    return isEnabled;
  },
  set: ({ set, get }, newValue) => {
    const isSuperUser = get(authSelectors.isSuperUser);

    return set(billingAtoms.isEnabledBillingPreview(isSuperUser), newValue);
  },
});

const bypassBillingForSuperUser = selector<boolean>({
  key: 'billing.superUser.bypass',
  get: ({ get }) => {
    const isSuperUser = get(authSelectors.isSuperUser);
    const isEnabled = get(billingAtoms.bypassBillingForSuperUser(isSuperUser));

    return isEnabled;
  },
  set: ({ set, get }, newValue) => {
    const isSuperUser = get(authSelectors.isSuperUser);

    return set(billingAtoms.bypassBillingForSuperUser(isSuperUser), newValue);
  },
});

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
        `${itemPrice.item_id}-${itemPrice.price_variant_id}` === selectedSKU &&
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

const hasAuthorizedBilling = selector<boolean>({
  key: 'billing.resources.canCreate',
  get: ({ get }) => {
    const isSuperUser = get(authSelectors.isSuperUser);
    const isEnabledBillingPreview = get(
      billingAtoms.isEnabledBillingPreview(isSuperUser),
    );

    if (!isEnabledBillingPreview) return true;

    const hasSubscriptionVal = get(hasSubscription);
    const isActiveSubscriptionVal = get(isActiveSubscription);
    const hasPaymentMethodVal = get(hasPaymentMethod);

    const isAuthorized =
      hasPaymentMethodVal && hasSubscriptionVal && isActiveSubscriptionVal;

    return isAuthorized || false;
  },
});

const pricing = selector<{
  subtotal: number;
  total: number;
  discount: number;
  discountPercentage: number;
}>({
  key: 'billing.pricing',
  get: ({ get }) => {
    const itemPrice = get(selectedItemPrice);
    const promoCode = get(billingAtoms.promoCode);

    const { subtotal, total, discount, discountPercentage } = computePricing(
      itemPrice,
      promoCode,
    );

    return {
      subtotal,
      total,
      discount,
      discountPercentage,
    };
  },
});

export const billingSelectors = {
  isEnabledBillingPreview,
  bypassBillingForSuperUser,

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
  hasAuthorizedBilling,

  pricing,
};
