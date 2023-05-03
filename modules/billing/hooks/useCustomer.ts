import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { _customer } from 'chargebee-typescript';
import { authAtoms, useIdentityRepository } from '@modules/auth';

export const useCustomer = (): ICustomerHook => {
  const repository = useIdentityRepository();
  const identity = repository?.getIdentity();

  const user = useRecoilValue(authAtoms.user);

  const [customer, setCustomer] = useRecoilState(billingAtoms.customer);
  const [customerLoadingState, setCustomerLoadingState] = useRecoilState(
    billingAtoms.billingAddressLoadingState,
  );

  const getCustomer = async (customerId: string) => {
    setCustomerLoadingState('initializing');
    const response = await fetch('/api/billing/customers/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerId),
    });

    const customer = await response.json();
    console.log('Chargebee customer loaded:', customer);

    if (!response.ok) {
      if (customer.error_code === 'resource_not_found') {
        // TODO: implemented for the already existing customers, should be removed
        const user = repository?.getIdentity();
        await createCustomer({
          id: user?.id,
          first_name: user?.firstName,
          last_name: user?.lastName,
          email: user?.email,
        });

        return;
      }

      setCustomerLoadingState('finished');
      throw new Error('Error getting Chargebee customer');
    }

    console.log('test123 SET CUSTOMER');

    setCustomer(customer);

    setCustomerLoadingState('finished');
  };

  const createCustomer = async (params: _customer.create_params) => {
    try {
      const response = await fetch('/api/billing/customers/create', {
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
      console.log('Chargebee customer created:', customer);

      setCustomer(customer);
    } catch (error) {}
  };

  return { customer, customerLoadingState, getCustomer, createCustomer };
};
