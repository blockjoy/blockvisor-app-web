import { selector } from 'recoil';
import { billingAtoms } from '@modules/billing';

const activePlan = selector<any>({
  key: 'billing.plan.active',
  get: ({ get }) => {
    let priceId: string | null = null;
    let activePlan = null;

    const subscription = get(billingAtoms.subscription);
    const plans = get(billingAtoms.plans);

    if (subscription && subscription.items.data.length > 0) {
      priceId = subscription.items.data[0].price.id;
    }

    activePlan = plans?.find((plan: IPlan) => plan.id === priceId);

    return activePlan;
  },
});

export const billingSelectors = {
  activePlan,
};
