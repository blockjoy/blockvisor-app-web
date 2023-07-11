import { Modal } from '@shared/components';
import { useEffect, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentRequired.styles';
import { PaymentMethodFormSimple } from '@modules/billing';

type PaymentRequiredProps = {
  onHide: VoidFunction;
  handleSubmit: VoidFunction;
  warningMessage?: string;
};

export const PaymentRequired = ({
  onHide,
  handleSubmit,
  warningMessage,
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
      portalId="modal-root"
      isOpen={true}
      handleClose={onHide}
      additionalStyles={[styles.modal]}
    >
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        Payment Information Required
      </h2>
      <div css={styles.info}>
        {warningMessage && <p>{warningMessage}</p>}
        <p>Please enter your payment details to continue.</p>
      </div>
      {isModalVisible && (
        <PaymentMethodFormSimple
          handleSubmit={handleSubmit}
          handleCancel={onHide}
        />
      )}
    </Modal>
  );
};
