import { selector, selectorFamily } from 'recoil';
import { Invoice } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms } from '@modules/billing';
import { organizationSelectors } from '@modules/organization';
import { authAtoms } from '@modules/auth';

const settings = selector<BillingSettings>({
  key: 'billing.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('billing')) return {};

    return JSON.parse(userSettings?.billing ?? '{}');
  },
});

const bypassBillingForSuperUser = selector({
  key: 'billing.settings.superUser.bypassBilling',
  get: ({ get }) => {
    const billingSettings = get(settings);

    return billingSettings.bypassBilling ?? false;
  },
});

const invoiceById = selectorFamily<Invoice | null, string>({
  key: 'billing.invoice',
  get:
    (id: string) =>
    ({ get }) => {
      const invoicesVal = get(billingAtoms.invoices);

      return invoicesVal.find((invoice) => invoice.number === id) || null;
    },
});

const hasPaymentMethod = selector({
  key: 'billing.hasPaymentMethod',
  get: ({ get }) => {
    const paymentMethods = get(billingAtoms.paymentMethods);

    return !!paymentMethods.length;
  },
});

const hasSubscription = selector({
  key: 'billing.hasSubscription',
  get: ({ get }) => {
    const subscriptionVal = get(billingAtoms.subscription);

    return subscriptionVal !== null;
  },
});

const canCreateResource = selector({
  key: 'billing.resources.canCreate',
  get: ({ get }) => {
    const hasSubscriptionVal = get(hasSubscription);
    const hasPaymentMethodVal = get(hasPaymentMethod);

    const { isAdmin, isOwner } = get(organizationSelectors.organizationRole);

    return hasPaymentMethodVal && hasSubscriptionVal && (isAdmin || isOwner);
  },
});

export const billingSelectors = {
  bypassBillingForSuperUser,

  invoiceById,

  hasPaymentMethod,
  hasSubscription,

  canCreateResource,
};
