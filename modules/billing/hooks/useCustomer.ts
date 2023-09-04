import { useRecoilState } from 'recoil';
import { _customer } from 'chargebee-typescript';
import { Customer } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';
import { useUserBilling, useIdentityRepository } from '@modules/auth';

interface ICustomerHook {
  customer: Customer | null;
  customerLoadingState: LoadingState;
  getCustomer: (customerId: string) => Promise<void>;
  createCustomer: (params: _customer.create_params) => Promise<Customer | null>;
  assignPaymentRole: (
    params: _customer.assign_payment_role_params,
  ) => Promise<void>;
  provideCustomer: () => Promise<Customer | null>;
}

export const useCustomer = (): ICustomerHook => {
  const repository = useIdentityRepository();
  const user = repository?.getIdentity();
  const { billingId, updateUserBilling, deleteUserBilling } = useUserBilling();

  const [customer, setCustomer] = useRecoilState(billingSelectors.customer);
  const [customerLoadingState, setCustomerLoadingState] = useRecoilState(
    billingAtoms.billingAddressLoadingState,
  );

  const getCustomer = async (id: string) => {
    setCustomerLoadingState('initializing');

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.customer.get, {
        id,
      });

      // TODO: Remove this after testing phase
      try {
        if (!data && billingId) await deleteUserBilling(user?.id!);
      } catch (error: any) {
        console.error('Failed to deleting User Billing', error);
      }

      setCustomer(data);
    } catch (error: any) {
      console.error('Failed to fetch Customer', error);
    }

    setCustomerLoadingState('finished');
  };

  const createCustomer = async (
    params: _customer.create_params,
  ): Promise<Customer | null> => {
    try {
      const data = await fetchBilling(BILLING_API_ROUTES.customer.create, {
        params,
      });

      console.log('%cCreateCustomer', 'color: #bff589', { params, data });

      try {
        await updateUserBilling(user?.id!, data.id);
      } catch (error: any) {
        console.error('Failed to update User Billing', error);
      }

      setCustomer(data);

      return data;
    } catch (error) {
      console.error('Failed to create Customer', error);
      return null;
    }
  };

  const assignPaymentRole = async (
    params: _customer.assign_payment_role_params,
  ) => {
    try {
      setCustomerLoadingState('loading');

      const data = await fetchBilling(
        BILLING_API_ROUTES.customer.payment.update,
        { customerId: customer?.id, params },
      );

      setCustomer(data);
    } catch (error) {
      console.error('Failed to assign Payment role', error);
    } finally {
      setCustomerLoadingState('finished');
    }
  };

  const provideCustomer = async (): Promise<Customer | null> => {
    if (!customer) {
      try {
        const newCustomer = await createCustomer({
          first_name: user?.firstName,
          last_name: user?.lastName,
          email: user?.email,
        });

        return newCustomer;
      } catch (error) {
        console.error('Failed to provide Customer for the current User', error);
        return null;
      }
    }

    return customer;
  };

  return {
    customer,
    customerLoadingState,
    getCustomer,
    createCustomer,

    assignPaymentRole,

    provideCustomer,
  };
};
