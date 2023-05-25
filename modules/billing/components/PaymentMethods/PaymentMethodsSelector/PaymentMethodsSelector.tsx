import { useEffect, useState } from 'react';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  CreditCardTypes,
  useCustomer,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  InputLabel,
  Scrollbar,
} from '@shared/components';
import { styles } from './PaymentMethodsSelector.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

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
      <InputLabel
        css={[typo.base]}
        labelSize="medium"
        name="paymentSource"
        disabled={false}
      >
        Select payment method
      </InputLabel>
      <DropdownWrapper
        isEmpty={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DropdownButton
          text={
            <p>
              {activePaymentMethod
                ? CreditCardTypes[activePaymentMethod.card?.brand!]
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
                      <p css={styles.active}>
                        {CreditCardTypes[paymentMethod.card?.brand!]}
                      </p>
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
