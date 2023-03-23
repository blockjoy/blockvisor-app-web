import { selectorFamily } from 'recoil';
import { billingAtoms } from '@modules/billing';

const activePlan = selectorFamily<IPlan | null, string>({
  key: 'billing.plan.active',
  get:
    (planId) =>
    ({ get }) => {
      const plans = get(billingAtoms.plans);

      const activePlan = plans?.find((plan: IPlan) => plan.id === planId);

      return activePlan ?? null;
    },
});

export const billingSelectors = {
  activePlan,
};
