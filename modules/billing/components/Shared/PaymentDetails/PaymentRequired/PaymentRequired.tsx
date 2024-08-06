import { useEffect, useState } from 'react';
import { Modal } from '@shared/components';
import { PaymentMethodForm, PaymentRequiredFormLoader } from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentRequired.styles';

type PaymentRequiredProps = {
  warningMessage?: string;
  handleCancel: VoidFunction;
  handleSubmit: VoidFunction;
};

export const PaymentRequired = ({
  warningMessage,
  handleCancel,
  handleSubmit,
}: PaymentRequiredProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      portalId="modal-payment-required"
      isOpen={true}
      handleClose={handleCancel}
      additionalStyles={[styles.modal]}
      isActive={false}
    >
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        Payment Information Required
      </h2>
      <div css={styles.info}>
        {warningMessage && <p>{warningMessage}</p>}
        <p>Please enter your payment details to continue.</p>
      </div>
      {isModalVisible ? (
        <PaymentMethodForm handleCancel={handleSubmit} />
      ) : (
        <PaymentRequiredFormLoader />
      )}
    </Modal>
  );
};
