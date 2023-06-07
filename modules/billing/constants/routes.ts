const BILLING_ROUTE = '/api/billing';

export const BILLING_API_ROUTES = {
  customer: {
    get: `${BILLING_ROUTE}/customers/get`,
    create: `${BILLING_ROUTE}/customers/create`,
    contacts: {
      list: `${BILLING_ROUTE}/customers/contacts/list`,
      create: `${BILLING_ROUTE}/customers/contacts/create`,
      delete: `${BILLING_ROUTE}/customers/contacts/delete`,
    },
    billingInfo: {
      update: `${BILLING_ROUTE}/customers/billing-info/update`,
    },
    payment: {
      update: `${BILLING_ROUTE}/customers/payment/update`,
    },
  },
  estimates: {
    get: `${BILLING_ROUTE}/estimates/get`,
  },
  invoices: {
    get: `${BILLING_ROUTE}/invoices/get`,
    list: `${BILLING_ROUTE}/invoices/list`,
  },
  items: {
    list: `${BILLING_ROUTE}/items/list`,
    prices: {
      list: `${BILLING_ROUTE}/items/prices/list`,
    },
  },
  payments: {
    intents: {
      create: `${BILLING_ROUTE}/payments/intents/create`,
    },
    sources: {
      get: `${BILLING_ROUTE}/payments/sources/get`,
      list: `${BILLING_ROUTE}/payments/sources/list`,
      create: `${BILLING_ROUTE}/payments/sources/create`,
      delete: `${BILLING_ROUTE}/payments/sources/delete`,
    },
  },
  plan: {
    get: `${BILLING_ROUTE}/plans/get`,
    list: `${BILLING_ROUTE}/plans/list`,
  },
  subsriptions: {
    get: `${BILLING_ROUTE}/subscriptions/get`,
    create: `${BILLING_ROUTE}/subscriptions/create`,
    update: `${BILLING_ROUTE}/subscriptions/update`,
    cancel: `${BILLING_ROUTE}/subscriptions/cancel`,
    reactivate: `${BILLING_ROUTE}/subscriptions/reactivate`,
    restore: `${BILLING_ROUTE}/subscriptions/restore`,
    item: { update: `${BILLING_ROUTE}/subscriptions/items/update` },
    billingProfile: {
      update: `${BILLING_ROUTE}/subscriptions/billing-profile/update`,
    },
  },
};
