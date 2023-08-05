import { useEffect, useState } from 'react';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  PaymentMethodsDropdown,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import {
  Button,
  ButtonGroup,
  InputLabel,
  TableSkeleton,
} from '@shared/components';
import { typo } from 'styles/utils.typography.styles';
import { containers } from 'styles/containers.styles';

type PaymentMethodsSelectProps = {
  subscriptionId: string;
  currentPaymentMethod: PaymentSource;
  onHide: VoidFunction;
};

export const PaymentMethodsSelect = ({
  subscriptionId,
  currentPaymentMethod,
  onHide,
}: PaymentMethodsSelectProps) => {
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

  if (paymentMethodsLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <div css={containers.mediumSmall}>
      <InputLabel
        css={[typo.base]}
        labelSize="medium"
        name="paymentSource"
        disabled={false}
      >
        Select payment method
      </InputLabel>
      <PaymentMethodsDropdown
        handlePaymentMethod={handleSelect}
        primaryId={activePaymentMethod?.id}
      />
      <ButtonGroup>
        <Button size="small" style="secondary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button size="small" style="outline" onClick={onHide}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
};
