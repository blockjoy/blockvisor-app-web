export const useCustomer = () => {
  const createCustomer = async (
    email: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      const customerData = {
        email,
        first_name: firstName,
        last_name: lastName,
      };

      console.log('customerData', customerData);

      const response = await fetch('/api/billing/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Error creating Chargebee customer');
      }

      const chargebeeCustomer = await response.json();
      console.log('Chargebee customer created:', chargebeeCustomer);
    } catch (error) {}
  };

  return { createCustomer };
};
