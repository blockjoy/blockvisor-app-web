import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BillingAddress } from 'chargebee-typescript/lib/resources/customer';
import { billingSelectors } from '@modules/billing';
import { Select } from '@shared/components';

type BillingAddressSelectProps = {
  handlePaymentBillingAddress: (billingAddress: BillingAddress) => void;
  handleNewAddress: VoidFunction;
};

export const BillingAddressSelect = ({
  handlePaymentBillingAddress,
  handleNewAddress,
}: BillingAddressSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(!isOpen);

  const billingAddress = useRecoilValue(billingSelectors.billingAddress);

  const handleSelect = (billingAddress: BillingAddress) => {
    handlePaymentBillingAddress(billingAddress);
    handleClose();
  };

  return (
    <Select
      buttonText={<p>{billingAddress?.line1}</p>}
      items={[billingAddress]?.map((billingAddress) => ({
        name: billingAddress?.line1 ?? '',
        onClick: () => handleSelect(billingAddress!),
      }))}
      newItem={{
        title: 'Add Billing Address',
        onClick: handleNewAddress,
      }}
    />
  );
};
