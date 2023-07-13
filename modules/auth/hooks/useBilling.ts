import { useRecoilState } from 'recoil';
import { userClient } from '@modules/grpc';
import { billingSelectors } from '@modules/billing';
import { ApplicationError } from '../utils/Errors';

export const useBilling = () => {
  const [userBillingId, setUserBillingId] = useRecoilState(
    billingSelectors.billingId,
  );

  const getBilling = async (userId: string) => {
    try {
      const response: any = await userClient.getBilling(userId);

      setUserBillingId(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('GetBillingError', error);
    }
  };

  const updateBilling: any = async (userId: string, billingId: string) => {
    try {
      const response: any = await userClient.updateBilling(userId, billingId);

      setUserBillingId(response || null);
      return response || null;
    } catch (error: any) {
      throw new ApplicationError('UpdateBillingError', error);
    }
  };

  const deleteBilling: any = async (userId: string) => {
    try {
      await userClient.deleteBilling(userId);

      setUserBillingId(null);
    } catch (error: any) {
      throw new ApplicationError('DeleteBillingError', error);
    }
  };

  return {
    billingId: userBillingId,
    setBillingId: setUserBillingId,

    getBilling,
    updateBilling,
    deleteBilling,
  };
};
