import { css } from '@emotion/react';
import { EmptyColumn, Modal } from '@shared/components';
import { styles } from './NodeLauncherNotification.styles';

type NodeLauncherNotificationProps = {
  handleClose: VoidFunction;
};

export const NodeLauncherNotification = ({
  handleClose,
}: NodeLauncherNotificationProps) => {
  return (
    <Modal
      portalId="modal-node-launched"
      isOpen={true}
      handleClose={handleClose}
      additionalStyles={[styles.modal]}
    >
      <EmptyColumn
        title="Your Request is In!"
        description={
          <>
            <p>
              Thanks for choosing to launch a node with us. Our team is already
              working on it and will be in touch with the details soon!
            </p>
          </>
        }
        additionalStyles={styles.emptyColumn}
      />
    </Modal>
  );
};
