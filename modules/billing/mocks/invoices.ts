export const INVOICES = [
  {
    id: '0002',
    createdAt:
      'Tue Feb 28 2023 16:15:49 GMT+0100 (Central European Standard Time)',
    amount: '$158.73',
    description: 'Algorand Nodes',
    status: 'pending',
    services: [
      {
        id: '1001',
        title: 'Montly Subscription',
        quantity: 1,
        price: '$100.00',
        totalPrice: '$100.00',
      },
      {
        id: '1002',
        title: 'Premium Customer Support',
        quantity: 2,
        price: '$30.00',
        totalPrice: '$60.00',
      },
    ],
  },
  {
    id: '0001',
    createdAt:
      'Tue Feb 26 2023 16:15:49 GMT+0100 (Central European Standard Time)',
    amount: '$126.15',
    description: 'Algorand Nodes',
    status: 'paid',
    services: [
      {
        id: '1001',
        title: 'Montly Subscription',
        quantity: 1,
        price: '$100.00',
        totalPrice: '$100.00',
      },
      {
        id: '1002',
        title: 'Premium Customer Support',
        quantity: 2,
        price: '$30.00',
        totalPrice: '$60.00',
      },
    ],
  },
];

export enum INVOICE_STATUS {
  processing = 'processing',
  succeeded = 'succeeded',
  failed = 'failed',
}
