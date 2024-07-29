import { selector, selectorFamily } from 'recoil';
import { Invoice } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms } from '@modules/billing';
import { authSelectors } from '@modules/auth';
import { organizationSelectors } from '@modules/organization';

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

const hasPaymentMethod = selector<boolean>({
  key: 'billing.hasPaymentMethod',
  get: ({ get }) => {
    const paymentMethods = get(billingAtoms.paymentMethods);

    return !!paymentMethods.length;
  },
});

const hasSubscription = selector<boolean>({
  key: 'billing.hasSubscription',
  get: ({ get }) => {
    const subscriptionVal = get(billingAtoms.subscription);

    return subscriptionVal !== null;
  },
});

const canCreateResource = selector<boolean>({
  key: 'billing.resources.canCreate',
  get: ({ get }) => {
    const hasSubscriptionVal = get(hasSubscription);
    const hasPaymentMethodVal = get(hasPaymentMethod);

    const { isAdmin, isOwner } = get(organizationSelectors.organizationRole);

    return hasPaymentMethodVal && hasSubscriptionVal && (isAdmin || isOwner);
  },
});

const invoice = selectorFamily<Invoice | null, string>({
  key: 'billing.invoice',
  get:
    (id: string) =>
    ({ get }) => {
      const invoicesVal = get(billingAtoms.invoices);

      return invoicesVal.find((invoice) => invoice.number === id) || null;
    },
});

export const billingSelectors = {
  bypassBillingForSuperUser,

  paymentMethodById,

  hasPaymentMethod,
  hasSubscription,
  canCreateResource,

  invoice,
};
