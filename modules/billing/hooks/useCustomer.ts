import { useRecoilState } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { _customer } from 'chargebee-typescript';
import { useIdentityRepository } from '@modules/auth';
import { Customer } from 'chargebee-typescript/lib/resources';

interface ICustomerHook {
  customer: Customer | null;
  customerLoadingState: LoadingState;
  getCustomer: (customerId: string) => void;
  createCustomer: (params: _customer.create_params) => Promise<Customer | null>;
  assignPaymentRole: (params: _customer.assign_payment_role_params) => void;
  provideCustomer: () => Promise<Customer | null>;
}

export const useCustomer = (): ICustomerHook => {
  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const [customer, setCustomer] = useRecoilState(billingSelectors.customer);
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

      setCustomer(!response.ok ? null : data);
    } catch (error: any) {
      console.log('Error while fetching a customer', error);
    }

    setCustomerLoadingState('finished');
  };

  const createCustomer = async (
    params: _customer.create_params,
  ): Promise<Customer | null> => {
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
      return null;
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

  const provideCustomer = async (): Promise<Customer | null> => {
    if (!customer) {
      try {
        const newCustomer = await createCustomer({
          id: user?.id,
          first_name: user?.firstName,
          last_name: user?.lastName,
          email: user?.email,
        });
        return newCustomer;
      } catch (error) {
        console.log(
          'Error while creating a customer in handlePaymentCreation',
          error,
        );
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
