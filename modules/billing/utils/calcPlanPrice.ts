export const calcPlanPrice = (price: number, billingPeriod: string) => {
  const annualPrice = price * 12 - 0.2 * price * 12;

  const totalPrice = billingPeriod === 'Monthly' ? price : annualPrice;

  return totalPrice;
};
