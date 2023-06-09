import { useRecoilState } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';
import { _customer } from 'chargebee-typescript';
import { useIdentityRepository } from '@modules/auth';

export const useCustomer = (): ICustomerHook => {
  const repository = useIdentityRepository();

  const [customer, setCustomer] = useRecoilState(billingAtoms.customer);
  const [customerLoadingState, setCustomerLoadingState] = useRecoilState(
    billingAtoms.billingAddressLoadingState,
  );

  const getCustomer = async (customerId: string) => {
    setCustomerLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.customer.get, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerId),
      });

      const data = await response.json();

      if (!response.ok) {
        setCustomer(null);
        return;
      }
      setCustomer(data);
    } catch (error: any) {
      console.log('Error while fetching a customer', error);
    }

    setCustomerLoadingState('finished');
  };

  const createCustomer = async (params: _customer.create_params) => {
    try {
      const response = await fetch(BILLING_API_ROUTES.customer.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Error creating Chargebee customer');
      }

      const customer = await response.json();

      setCustomer(customer);

      return customer;
    } catch (error) {
      console.log('Error while creating a customer', error);
    }
  };

  const assignPaymentRole = async (
    params: _customer.assign_payment_role_params,
  ) => {
    try {
      const response = await fetch(BILLING_API_ROUTES.customer.payment.update, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: customer?.id, params }),
      });

      if (!response.ok) {
        throw new Error('Error creating Chargebee customer');
      }

      const data = await response.json();

      setCustomer(data);
    } catch (error) {}
  };

  return {
    customer,
    customerLoadingState,
    getCustomer,
    createCustomer,

    assignPaymentRole,
  };
};
