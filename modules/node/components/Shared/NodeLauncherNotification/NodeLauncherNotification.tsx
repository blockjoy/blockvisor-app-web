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
      isActive={false}
      handleClose={handleClose}
      additionalStyles={[styles.modal]}
    >
      <EmptyColumn
        hasMaxWidth={false}
        title="Your Request is In!"
        description={
          <>
            <p>
              Thanks for choosing to launch a node with us. Our team is already
              working on it and will be in touch!
            </p>
            <br />
            <p>
              For immediate assistance please reach out on{' '}
              <a
                css={styles.link}
                href="https://t.me/blockjoyweb3"
                target="_blank"
              >
                Telegram
              </a>
              .
            </p>
          </>
        }
        additionalStyles={styles.emptyColumn}
      />
    </Modal>
  );
};
