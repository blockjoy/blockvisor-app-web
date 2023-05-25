import { useCustomer } from '@modules/billing/hooks/useCustomer';
import { usePaymentMethods } from '@modules/billing/hooks/usePaymentMethods';
import { useSubscription } from '@modules/billing/hooks/useSubscription';
import { ButtonGroup } from '@shared/components/Buttons/ButtonGroup/ButtonGroup';
import {
  Button,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Scrollbar,
} from '@shared/index';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { useEffect, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './PaymentMethodsSelector.styles';

type PaymentMethodsSelectorProps = {
  currentPaymentMethod: PaymentSource;
  onHide: VoidFunction;
};

export const PaymentMethodsSelector = ({
  currentPaymentMethod,
  onHide,
}: PaymentMethodsSelectorProps) => {
  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentSource>(currentPaymentMethod);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(!isOpen);

  const { paymentMethods, getPaymentMethods } = usePaymentMethods();
  const { updateBillingProfile } = useSubscription();
  const { customer } = useCustomer();

  useEffect(() => {
    getPaymentMethods({
      customer_id: { is: customer?.id },
      type: { is: 'card' },
    });
  }, []);

  const handleSelect = (paymentMethod: PaymentSource) => {
    setActivePaymentMethod(paymentMethod);
    handleClose();
  };

  const handleConfirm = () => {
    updateBillingProfile(activePaymentMethod?.id);
    onHide();
  };

  return (
    <div>
      <h3>Select different payment method:</h3>
      <DropdownWrapper
        isEmpty={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DropdownButton
          text={
            <p>
              {activePaymentMethod
                ? activePaymentMethod.card?.brand
                : 'Select payment method'}
            </p>
          }
          onClick={handleClose}
          isOpen={isOpen}
        />

        <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
          <Scrollbar additionalStyles={[styles.dropdownInner]}>
            <ul>
              {paymentMethods?.map((paymentMethod: PaymentSource) => {
                return (
                  <li key={paymentMethod.id}>
                    <DropdownItem
                      size="medium"
                      type="button"
                      onButtonClick={() => handleSelect(paymentMethod)}
                    >
                      <p css={styles.activeOrg}>{paymentMethod.card?.brand}</p>
                    </DropdownItem>
                  </li>
                );
              })}
            </ul>
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
      <ButtonGroup>
        <Button size="small" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button size="small" style="outline" onClick={onHide}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
};
