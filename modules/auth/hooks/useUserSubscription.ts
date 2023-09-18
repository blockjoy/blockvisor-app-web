import { useRecoilState, useSetRecoilState } from 'recoil';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { billingSelectors } from '@modules/billing';
import { subscriptionClient } from '@modules/grpc';
import { Subscription } from '@modules/grpc/library/blockjoy/v1/subscription';

interface IUseUserSubscriptionHook {
  userSubscription: Subscription | null;
  getUserSubscription: (orgId: string) => Promise<Subscription | null>;
  getUserSubscriptions: (userId: string) => Promise<Subscription[] | null>;
  createUserSubscription: (
    orgId: string,
    userId: string,
    externalId: string,
  ) => Promise<Subscription | null>;
  deleteUserSubscription: (id: string) => Promise<void>;
}

export const useUserSubscription = (): IUseUserSubscriptionHook => {
  const [userSubscription, setUserSubscription] = useRecoilState(
    billingSelectors.userSubscription,
  );
  const setSubscription = useSetRecoilState(billingSelectors.subscription);

  const getUserSubscription = async (orgId: string): Promise<Subscription> => {
    try {
      const response: any = await subscriptionClient.getSubscription(orgId);
      if (!response) setSubscription(null);

      setUserSubscription(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('GetUserSubscriptionError', error);
    }
  };

  const getUserSubscriptions = async (
    userId: string,
  ): Promise<Subscription[]> => {
    try {
      const response: any = await subscriptionClient.getSubscription(userId);

      setUserSubscription(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('GetUserSubscriptionsError', error);
    }
  };

  const createUserSubscription = async (
    orgId: string,
    userId: string,
    externalId: string,
  ): Promise<Subscription> => {
    try {
      const response: any = await subscriptionClient.createSubscription(
        orgId,
        userId,
        externalId,
      );

      setUserSubscription(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('CreateUserSubscriptionError', error);
    }
  };

  const deleteUserSubscription = async (id: string): Promise<void> => {
    try {
      await subscriptionClient.deleteSubscription(id);

      setUserSubscription(null);
    } catch (error: any) {
      throw new ApplicationError('DeleteUserSubscriptionError', error);
    }
  };

  return {
    userSubscription,

    getUserSubscription,
    getUserSubscriptions,
    createUserSubscription,
    deleteUserSubscription,
  };
};
