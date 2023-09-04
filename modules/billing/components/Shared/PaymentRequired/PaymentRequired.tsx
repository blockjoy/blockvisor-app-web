import { useEffect, useState } from 'react';
import { Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentRequired.styles';
import {
  PaymentMethodFormSimple,
  PaymentMethodFormSimpleLoader,
} from '@modules/billing';

type PaymentRequiredProps = {
  warningMessage?: string;
  handleCancel: VoidFunction;
  handleSubmit: VoidFunction;
  handleHide: VoidFunction;
};

export const PaymentRequired = ({
  warningMessage,
  handleCancel,
  handleSubmit,
  handleHide,
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
    >
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        Payment Information Required
      </h2>
      <div css={styles.info}>
        {warningMessage && <p>{warningMessage}</p>}
        <p>Please enter your payment details to continue.</p>
      </div>
      {isModalVisible ? (
        <PaymentMethodFormSimple
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleHide={handleHide}
        />
      ) : (
        <PaymentMethodFormSimpleLoader />
      )}
    </Modal>
  );
};
