import { useRecoilState } from 'recoil';
import { SUBSCRIPTION } from '../mocks/subscription';
import { billingAtoms } from '@modules/billing';

export const useSubscription = (): ISubscriptionHook => {
  const [subscription, setSubscription] = useRecoilState(
    billingAtoms.subscription,
  );
  const [subscriptionLoadingState, setsubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const getSubscription = async () => {
    setsubscriptionLoadingState('initializing');

    await new Promise((r) => setTimeout(r, 300));

    const subscription: ISubscription = SUBSCRIPTION;

    setSubscription(subscription);

    setsubscriptionLoadingState('finished');
  };

  const createSubscription = async (sub: ISubscription) => {
    setsubscriptionLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 300));

    const subscription: ISubscription = sub;

    setSubscription(subscription);
    setsubscriptionLoadingState('finished');
  };

  const updateSubscription = async (sub: ISubscription) => {
    setsubscriptionLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 300));

    const subscription: ISubscription = sub;

    setSubscription(subscription);
    setsubscriptionLoadingState('finished');
  };

  const cancelSubscription = async () => {
    setsubscriptionLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 300));

    setSubscription(null);
    setsubscriptionLoadingState('finished');
  };

  return {
    subscription,
    subscriptionLoadingState,

    getSubscription,
    createSubscription,
    updateSubscription,
    cancelSubscription,
  };
};
