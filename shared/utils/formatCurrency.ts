export const formatCurrency = (number: number) =>
  Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
