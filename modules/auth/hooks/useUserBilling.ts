import { useRecoilState } from 'recoil';
import { userClient } from '@modules/grpc';
import { billingSelectors } from '@modules/billing';
import { ApplicationError } from '@modules/auth/utils/Errors';

interface IUseUserBillingHook {
  billingId: string | null;

  getUserBilling: (userId: string) => Promise<string | null>;
  updateUserBilling: (
    userId: string,
    billingId: string,
  ) => Promise<string | null>;
  deleteUserBilling: (userId: string) => Promise<void>;
}

export const useUserBilling = (): IUseUserBillingHook => {
  const [userBillingId, setUserBillingId] = useRecoilState(
    billingSelectors.billingId,
  );

  const getUserBilling = async (userId: string): Promise<string | null> => {
    try {
      const response: any = await userClient.getBilling(userId);

      setUserBillingId(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('GetBillingError', error);
    }
  };

  const updateUserBilling: any = async (
    userId: string,
    billingId: string,
  ): Promise<string | null> => {
    try {
      const response: any = await userClient.updateBilling(userId, billingId);

      setUserBillingId(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('UpdateBillingError', error);
    }
  };

  const deleteUserBilling: any = async (userId: string): Promise<void> => {
    try {
      await userClient.deleteBilling(userId);

      setUserBillingId(null);
    } catch (error: any) {
      throw new ApplicationError('DeleteBillingError', error);
    }
  };

  return {
    billingId: userBillingId,

    getUserBilling,
    updateUserBilling,
    deleteUserBilling,
  };
};
