import { formatCurrency } from '@shared/index';

export const mapPlanDataToDetails = (plan: IPlan) => {
  return [
    {
      label: 'Active Plan',
      data: plan.nickname,
    },
    {
      label: 'Price per Node',
      data: formatCurrency(plan.amount),
    },
  ];
};
