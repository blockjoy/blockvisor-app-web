import { useEffect, useState } from 'react';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  CreditCardTypes,
  PaymentMethodsSelect,
  useCustomer,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import {
  Button,
  ButtonGroup,
  InputLabel,
  TableSkeleton,
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

  const { paymentMethodsLoadingState, getPaymentMethods } = usePaymentMethods();
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
    <>
      {paymentMethodsLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <>
          <InputLabel
            css={[typo.base]}
            labelSize="medium"
            name="paymentSource"
            disabled={false}
          >
            Select payment method
          </InputLabel>
          <PaymentMethodsSelect
            handlePaymentMethod={handleSelect}
            primaryId={activePaymentMethod?.id}
          />
          <ButtonGroup>
            <Button size="small" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button size="small" style="outline" onClick={onHide}>
              Cancel
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
};
