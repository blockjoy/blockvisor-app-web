import {
  billingAtoms,
  billingSelectors,
  CreditCardTypes,
} from '@modules/billing';
import {
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Scrollbar,
} from '@shared/components';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { BillingAddress } from 'chargebee-typescript/lib/resources/customer';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './BillingAddressSelect.styles';
import IconPlus from '@public/assets/icons/plus-12.svg';

type BillingAddressSelectProps = {
  handlePaymentBillingAddress: (billingAddress: BillingAddress) => void;
  onCreate: any;
};

export const BillingAddressSelect = ({
  handlePaymentBillingAddress,
  onCreate,
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
        <button css={[styles.createButton]} onClick={onCreate}>
          <IconPlus /> Add Billing address
        </button>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
