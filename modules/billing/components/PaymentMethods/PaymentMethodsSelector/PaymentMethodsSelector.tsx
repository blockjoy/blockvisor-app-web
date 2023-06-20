import { useEffect, useState } from 'react';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
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
import { typo } from 'styles/utils.typography.styles';

type PaymentMethodsSelectorProps = {
  subscriptionId: string;
  currentPaymentMethod: PaymentSource;
  onHide: VoidFunction;
};

export const PaymentMethodsSelector = ({
  subscriptionId,
  currentPaymentMethod,
  onHide,
}: PaymentMethodsSelectorProps) => {
  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentSource>(currentPaymentMethod);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(!isOpen);

  const { paymentMethodsLoadingState, getPaymentMethods } = usePaymentMethods();
  const { updateBillingProfile } = useSubscription();

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const handleSelect = (paymentMethod: PaymentSource) => {
    setActivePaymentMethod(paymentMethod);
    handleClose();
  };

  const handleConfirm = () => {
    updateBillingProfile(subscriptionId, {
      paymentMethodId: activePaymentMethod?.id,
    });
    onHide();
  };

  return (
    <>
      {paymentMethodsLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <div css={styles.wrapper}>
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
        </div>
      )}
    </>
  );
};
