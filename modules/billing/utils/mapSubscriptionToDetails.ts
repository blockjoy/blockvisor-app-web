import { formatCurrency } from '@shared/index';
import { useRecoilValue } from 'recoil';
import { billingSelectors } from '../store/billingSelectors';

export const mapSubscriptionToDetails = (subscription: ISubscription) => {
  const planId = subscription.items.data[0].price.id;
  const activePlan = useRecoilValue(billingSelectors.activePlan(planId));

  return [
    {
      label: 'Active Plan',
      data: activePlan?.nickname!,
    },
    {
      label: 'Price per Node',
      data: formatCurrency(activePlan?.amount!),
    },
  ];
};
