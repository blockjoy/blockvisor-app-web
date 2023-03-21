export const formatCurrency = (number: number) =>
  Number(number / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
