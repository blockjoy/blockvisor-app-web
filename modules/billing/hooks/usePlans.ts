import { useRecoilState } from 'recoil';
import { BILLING_PLANS } from '../mocks/plan';
import { billingAtoms } from '@modules/billing';

export const usePlans = (): IPlansHook => {
  const [plans, setPlans] = useRecoilState(billingAtoms.plans);
  const [plansLoadingState, setPlansLoadingState] = useRecoilState(
    billingAtoms.plansLoadingState,
  );

  const getPlan = async (planId: string) => {
    setPlansLoadingState('initializing');

    console.log('GETPLAN');

    try {
      const response = await fetch('/api/billing/plans/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: planId }),
      });

      const data = await response.json();

      console.log('invoiceId', planId);
      console.log('data', data);

      setPlans([data]);
    } catch (error) {
      console.error('Failed to fetch plans', error);
    } finally {
      setPlansLoadingState('finished');
    }
  };

  const getPlans = async () => {
    setPlansLoadingState('initializing');

    // await new Promise((r) => setTimeout(r, 300));

    // const response = await fetch('/api/billing/plans/list', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const plansNew = await response.json();

    const plans: IPlan[] = BILLING_PLANS;

    setPlans(plans);

    setPlansLoadingState('finished');
  };

  return {
    plans,
    plansLoadingState,

    getPlan,
    getPlans,
  };
};
