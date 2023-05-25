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
    const response = await fetch(BILLING_API_ROUTES.customer.get, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerId),
    });

    const data = await response.json();
    console.log('Chargebee customer loaded:', data);

    if (!response.ok) {
      if (data.error_code === 'resource_not_found') {
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

    setCustomer(data);

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
      console.log('Chargebee customer created:', customer);

      setCustomer(customer);
    } catch (error) {}
  };

  return { customer, customerLoadingState, getCustomer, createCustomer };
};
