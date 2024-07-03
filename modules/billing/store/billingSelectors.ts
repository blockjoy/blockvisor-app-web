import { selector, selectorFamily } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { authAtoms, authSelectors } from '@modules/auth';
import { Address, PaymentMethodCreateParams } from '@stripe/stripe-js';
import { OrgServiceBillingDetailsResponse } from '@modules/grpc/library/blockjoy/v1/org';

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

const customer = selector<any>({
  key: 'billing.customer',
  get: ({ get }) => get(billingAtoms.billing)?.customer,
  set: ({ set }, newValue) =>
    set(billingAtoms.billing, (prevState: any) => ({
      ...prevState,
      customer: newValue,
    })),
});

const billingAddress = selector<Address | null>({
  key: 'billing.billingAddress',
  get: ({ get }) => {
    const customerVal = get(customer);
    if (!customerVal) return null;

    const address: Address = {
      city: '',
      country: '',
      line1: '',
      line2: '',
      postal_code: '',
      state: '',
    };

    return address;
  },
});

const paymentMethodById = selectorFamily<any | null, string>({
  key: 'billing.paymentMethodById',
  get:
    (paymentSourceId: string) =>
    ({ get }) => {
      if (!paymentSourceId) return null;

      const paymentMethods = get(billingAtoms.paymentMethods);
      if (!paymentMethods || !paymentMethods.length) return null;

      const selectedPaymentMethod = paymentMethods.find(
        (paymentMethod: any) => paymentMethod.id === paymentSourceId,
      );

      return selectedPaymentMethod || null;
    },
});

const subscription = selector<OrgServiceBillingDetailsResponse | null>({
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
    const subscription = get(billingAtoms.billing)?.subscription;

    return subscription !== null;
  },
});

const isActiveSubscription = selector<boolean>({
  key: 'billing.subscription.isActive',
  get: ({ get }) => {
    const subscriptionVal = get(subscription);
    if (!subscriptionVal) return false;

    // return subscriptionVal?.status === 'active';
    return true;
  },
});

const hasAuthorizedBilling = selector<boolean>({
  key: 'billing.resources.canCreate',
  get: ({ get }) => {
    const hasSubscriptionVal = get(hasSubscription);
    const isActiveSubscriptionVal = get(isActiveSubscription);
    const hasPaymentMethodVal = get(hasPaymentMethod);

    const isAuthorized =
      hasPaymentMethodVal && hasSubscriptionVal && isActiveSubscriptionVal;

    return isAuthorized || false;
  },
});

const billingDetails = selector<PaymentMethodCreateParams.BillingDetails>({
  key: 'billing.card.billingDetails',
  get: ({ get }) => {
    const cardHolder = get(billingAtoms.cardHolder);
    const address = get(billingAtoms.cardAddress);
    const user = get(authAtoms.user);

    return {
      address: {
        city: address.city ?? '',
        country: address.country ?? '',
        line1: address.line1 ?? '',
        postal_code: address.postal_code ?? '',
      },
      email: user?.email,
      name: `${cardHolder.firstName} ${cardHolder.lastName}`,
    };
  },
});

const isValidCardForm = selector<boolean>({
  key: 'billing.card.isValidForm',
  get: ({ get }) => {
    const isValidCardVal = get(billingAtoms.isValidCard);
    const billingDetailsVal = get(billingDetails);

    const isValidBillingDetails =
      Object.values(billingDetailsVal?.address!).every(
        (value) => value.trim() !== '',
      ) &&
      billingDetailsVal.email!.trim() !== '' &&
      billingDetailsVal.name!.trim() !== '';

    return isValidCardVal && isValidBillingDetails;
  },
});

const invoice = selectorFamily<any | null, string>({
  key: 'billing.invoice',
  get:
    (id: string) =>
    ({ get }) => {
      const invoicesVal = get(billingAtoms.invoices);

      return invoicesVal.find((invoice) => invoice.id === id) || null;
    },
});

export const billingSelectors = {
  bypassBillingForSuperUser,

  billingId,

  customer,
  subscription,

  billingAddress,
  paymentMethodById,

  hasBillingAddress,
  hasPaymentMethod,
  hasSubscription,
  isActiveSubscription,
  hasAuthorizedBilling,

  billingDetails,

  isValidCardForm,

  invoice,
};
