const BILLING_API_ROUTE = '/api/billing';

export const BILLING_API_ROUTES = {
  customer: {
    get: `${BILLING_API_ROUTE}/customers/get`,
    create: `${BILLING_API_ROUTE}/customers/create`,
    contacts: {
      list: `${BILLING_API_ROUTE}/customers/contacts/list`,
      create: `${BILLING_API_ROUTE}/customers/contacts/create`,
      delete: `${BILLING_API_ROUTE}/customers/contacts/delete`,
    },
    billingInfo: {
      update: `${BILLING_API_ROUTE}/customers/billing-info/update`,
    },
    payment: {
      update: `${BILLING_API_ROUTE}/customers/payment/update`,
    },
  },
  estimates: {
    get: `${BILLING_API_ROUTE}/estimates/get`,
  },
  invoices: {
    get: `${BILLING_API_ROUTE}/invoices/get`,
    list: `${BILLING_API_ROUTE}/invoices/list`,
    pdf: {
      get: `${BILLING_API_ROUTE}/invoices/pdf/get`,
    },
  },
  items: {
    get: `${BILLING_API_ROUTE}/items/get`,
    list: `${BILLING_API_ROUTE}/items/list`,
    prices: {
      list: `${BILLING_API_ROUTE}/items/prices/list`,
    },
  },
  payments: {
    intents: {
      create: `${BILLING_API_ROUTE}/payments/intents/create`,
    },
    sources: {
      get: `${BILLING_API_ROUTE}/payments/sources/get`,
      list: `${BILLING_API_ROUTE}/payments/sources/list`,
      create: `${BILLING_API_ROUTE}/payments/sources/create`,
      delete: `${BILLING_API_ROUTE}/payments/sources/delete`,
    },
  },
  plan: {
    get: `${BILLING_API_ROUTE}/plans/get`,
    list: `${BILLING_API_ROUTE}/plans/list`,
  },
  subscriptions: {
    get: `${BILLING_API_ROUTE}/subscriptions/get`,
    list: `${BILLING_API_ROUTE}/subscriptions/list`,
    create: `${BILLING_API_ROUTE}/subscriptions/create`,
    update: `${BILLING_API_ROUTE}/subscriptions/update`,
    cancel: `${BILLING_API_ROUTE}/subscriptions/cancel`,
    reactivate: `${BILLING_API_ROUTE}/subscriptions/reactivate`,
    restore: `${BILLING_API_ROUTE}/subscriptions/restore`,
    billingProfile: {
      update: `${BILLING_API_ROUTE}/subscriptions/billing-profile/update`,
    },
  },
};
