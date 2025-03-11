import { Modal } from '@shared/components';
import { PaymentMethodForm } from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentRequired.styles';

type PaymentRequiredProps = {
  isOpen?: boolean;
  title?: string;
  warningMessage?: string;
  handleCancel: VoidFunction;
};

export const PaymentRequired = ({
  isOpen,
  title,
  warningMessage,
  handleCancel,
}: PaymentRequiredProps) => {
  return (
    <Modal
      portalId="modal-payment-required"
      isOpen={isOpen}
      handleClose={handleCancel}
      additionalStyles={[styles.modal]}
      isActive={false}
    >
      <h2 css={[typo.medium, spacing.bottom.medium]}>Add payment method</h2>
      <div css={styles.info}>
        <p>Please enter your payment details to continue.</p>
      </div>

      <PaymentMethodForm handleCancel={handleCancel} />
    </Modal>
  );
};
