import { escapeHtml } from '@shared/utils/escapeHtml';
import { Button, Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentMethodDialog.styles';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { capitalize } from 'utils/capitalize';

export type PaymentMethodDialogProps = {
  paymentMethod: PaymentSource;
  onConfirm: (id: string) => void;
  onHide: VoidFunction;
};

export const PaymentMethodDialog = ({
  paymentMethod,
  onConfirm,
  onHide,
}: PaymentMethodDialogProps) => {
  const handleRemoval = async () => {
    await onConfirm(paymentMethod?.id!);
  };

  const handleSubmit = () => {
    handleRemoval();
    onHide();
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>Remove Payment Method</h2>
      <div css={spacing.bottom.medium}>
        <p>{`You are removing 
          ${capitalize(paymentMethod?.card?.brand!)} ****${
          paymentMethod?.card?.last4
        } from Payment Methods list.`}</p>
      </div>
      <div css={[styles.actions]}>
        <Button style="warning" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button style="outline" onClick={onHide}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
