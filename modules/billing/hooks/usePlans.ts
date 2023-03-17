import { useRecoilState } from 'recoil';
import { BILLING_PLANS } from '../mocks/plan';
import { billingAtoms } from '@modules/billing';

export const usePlans = (): IPlansHook => {
  const [plans, setPlans] = useRecoilState(billingAtoms.plans);
  const [plansLoadingState, setPlansLoadingState] = useRecoilState(
    billingAtoms.plansLoadingState,
  );

  const getPlans = async () => {
    setPlansLoadingState('initializing');

    await new Promise((r) => setTimeout(r, 600));

    const plans: IPlan[] = BILLING_PLANS;

    setPlans(plans);

    setPlansLoadingState('finished');
  };

  return {
    plans,
    plansLoadingState,

    getPlans,
  };
};
