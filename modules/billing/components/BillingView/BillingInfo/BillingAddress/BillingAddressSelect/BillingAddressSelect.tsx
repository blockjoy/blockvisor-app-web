import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BillingAddress } from 'chargebee-typescript/lib/resources/customer';
import { billingSelectors } from '@modules/billing';
import {
  DropdownButton,
  DropdownCreate,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Scrollbar,
} from '@shared/components';
import { styles } from './BillingAddressSelect.styles';

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
    <DropdownWrapper
      isEmpty={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        text={<p>{billingAddress?.line1}</p>}
        onClick={handleClose}
        isOpen={isOpen}
      />

      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            <li>
              <DropdownItem
                size="medium"
                type="button"
                onButtonClick={() => handleSelect(billingAddress!)}
              >
                <p css={styles.active}>{billingAddress?.line1}</p>
              </DropdownItem>
            </li>
          </ul>
        </Scrollbar>
        <DropdownCreate
          title="Add Billing address"
          handleClick={handleNewAddress}
        />
      </DropdownMenu>
    </DropdownWrapper>
  );
};
