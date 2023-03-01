export const INVOICES = [
  {
    id: '0002',
    createdAt:
      'Tue Feb 28 2023 16:15:49 GMT+0100 (Central European Standard Time)',
    amount: '$158.73',
    description: 'Algorand Nodes',
    status: 'pending',
  },
  {
    id: '0001',
    createdAt:
      'Tue Feb 26 2023 16:15:49 GMT+0100 (Central European Standard Time)',
    amount: '$126.15',
    description: 'Algorand Nodes',
    status: 'paid',
  },
];

export enum INVOICE_STATUS {
  processing = 'processing',
  succeeded = 'succeeded',
  failed = 'failed',
}
