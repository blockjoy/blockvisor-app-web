import { Currency } from '@modules/grpc/library/blockjoy/common/v1/currency';
import { Invoice } from '@modules/grpc/library/blockjoy/v1/org';

export const _UPCOMING_INVOICE: Invoice = {
  subtotal: 1063200,
  total: 744240,
  discounts:
    // [
    [
      {
        name: '30% off',
        amount: {
          currency: Currency.CURRENCY_USD,
          amountMinorUnits: 318960,
        },
      },
    ],
  // ],
  lineItems: [
    {
      subtotal: 376000,
      total: 263200,
      unitAmount: 188000,
      description: '2 × Solana Full (at $1,880.00 / month)',
      plan: 'Solana Full - APAC',
      proration: false,
      quantity: 2,
      discounts: [
        {
          name: '30% off',
          amount: {
            currency: Currency.CURRENCY_USD,
            amountMinorUnits: 112800,
          },
        },
      ],
    },
    {
      subtotal: 400000,
      total: 400000,
      unitAmount: 40000,
      description: '10 × Osmosis Full (at $400.00 / month)',
      plan: 'Osmosis Full - EU',
      proration: false,
      quantity: 10,
      discounts: [],
    },
    {
      subtotal: 400000,
      total: 400000,
      unitAmount: 40000,
      description: '10 × Polygon zkEVM Full (at $400.00 / month)',
      plan: 'Polygon zkEVM Full - EU',
      proration: false,
      quantity: 10,
      discounts: [],
    },
  ],
};
