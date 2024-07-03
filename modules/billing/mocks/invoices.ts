export const _INVOICES = [
  {
    id: '180AB326-0004',
    amount_due: 26115,
    created: 1720013399,
    customer_address: {
      city: 'Boston',
      country: 'US',
      line1: '867 Boylston Street',
      line2: '5th Floor #1348',
      postal_code: '02116',
      state: 'MA',
    },
    customer_name: 'Dragan Rakita',
    discount: {
      coupon: {
        name: '30% off',
      },
    },
    invoice_pdf:
      'https://pay.stripe.com/invoice/acct_1KfoP7B5ce1jJsfT/test_YWNjdF8xS2ZvUDdCNWNlMWpKc2ZULF9RUEhwN1lTTXB5YUhGV2kyTnFITmFHYlM4OXJ0Q08xLDExMDU1NDIzNQ0200ndrsYOkl/pdf?s=ap',
    lines: {
      data: [
        {
          id: 'il_1PYTFzB5ce1jJsfTR84BDFdQ',
          amount: 26115,
          description:
            'Remaining time on Osmosis Full (with 30.0% off) after 03 Jul 2024',
          period: {
            end: 1722511445,
            start: 1720013399,
          },
          plan: {
            nickname: 'Osmosis Full - EU',
          },
          price: {
            unit_amount: 40000,
          },
          proration: true,
        },
      ],
    },
    status: 'paid',
    subtotal: 26115,
    total: 26115,
  },
  {
    id: '180AB326-0003',
    amount_due: 911869,
    created: 1719913200,
    customer_address: {
      city: 'Boston',
      country: 'US',
      line1: '867 Boylston Street',
      line2: '5th Floor #1348',
      postal_code: '02116',
      state: 'MA',
    },
    customer_name: 'Dragan Rakita',
    invoice_pdf:
      'https://pay.stripe.com/invoice/acct_1KfoP7B5ce1jJsfT/test_YWNjdF8xS2ZvUDdCNWNlMWpKc2ZULF9RT3F0b2loeVpqR2cwbEdSQ2pNc1lMVFJFRU5kZWp2LDExMDQ1NDAxMg0200N8GDp5yP/pdf?s=ap',
    lines: {
      data: [
        {
          id: 'il_1PY3BsB5ce1jJsfT5uC64RsY',
          amount: 911869,
          description: 'Remaining time on 5 × Solana Full after 02 Jul 2024',
          discount_amounts: [],
          period: {
            end: 1722511445,
            start: 1719913200,
          },
          plan: {
            nickname: 'Solana Full - US East',
          },
          price: {
            unit_amount: 188000,
          },
          proration: true,
          quantity: 5,
        },
      ],
    },
    status: 'paid',
    subtotal: 911869,
    total: 911869,
  },
  {
    id: '180AB326-0002',
    amount_due: 53450,
    created: 1719840548,
    customer_address: {
      city: 'Boston',
      country: 'US',
      line1: '867 Boylston Street',
      line2: '5th Floor #1348',
      postal_code: '02116',
      state: 'MA',
    },
    customer_name: 'Dragan Rakita',
    invoice_pdf:
      'https://pay.stripe.com/invoice/acct_1KfoP7B5ce1jJsfT/test_YWNjdF8xS2ZvUDdCNWNlMWpKc2ZULF9RT1hNYlpFVHd1Z3ROeDFMNHFqeDRJTW5FSlRHb1ByLDExMDQ1NDAxMg0200jO9VUQox/pdf?s=ap',
    lines: {
      data: [
        {
          id: 'il_1PXkI4B5ce1jJsfTAlOpGSNz',
          amount: 53450,
          description: 'Remaining time on Polygon Geth Full after 01 Jul 2024',
          discount_amounts: [],
          period: {
            end: 1722511445,
            start: 1719840548,
          },
          plan: {
            nickname: 'Polygon Geth Full - EU',
          },
          price: {
            unit_amount: 53600,
          },
          proration: true,
          quantity: 1,
        },
      ],
    },
    status: 'paid',
    subtotal: 53450,
    total: 53450,
  },
  {
    id: '180AB326-0001',
    amount_due: 1880000,
    created: 1719833045,
    customer_address: {
      city: 'Boston',
      country: 'US',
      line1: '867 Boylston Street',
      line2: '5th Floor #1348',
      postal_code: '02116',
      state: 'MA',
    },
    customer_name: 'Dragan Rakita',
    invoice_pdf:
      'https://pay.stripe.com/invoice/acct_1KfoP7B5ce1jJsfT/test_YWNjdF8xS2ZvUDdCNWNlMWpKc2ZULF9RT1ZMU3pkUmlkWWNhTXZROWw4WEdNTTFnUWtSa1JPLDExMDQ1NDAxMg02009afp2Y6U/pdf?s=ap',
    lines: {
      data: [
        {
          id: 'il_1PXiL3B5ce1jJsfTT9f7FPCA',
          amount: 1880000,
          description: '10 × Solana Full (at $1,880.00 / month)',
          discount_amounts: [],
          period: {
            end: 1722511445,
            start: 1719833045,
          },
          plan: {
            nickname: 'Solana Full - APAC',
          },
          price: {
            unit_amount: 188000,
          },
          proration: false,
          quantity: 10,
        },
      ],
    },
    status: 'paid',
    subtotal: 1880000,
    total: 1880000,
  },
];
