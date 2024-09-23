import { Modal, SvgIcon } from '@shared/components';
import { styles } from './NodeLauncherNotification.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';

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
      <h2 css={styles.headline}>Your Request is In!</h2>
      <div css={styles.message}>
        <p>
          Thank you for taking the first step toward launching your very own
          node!
        </p>
        <p>
          We're thrilled to have you on board. Our team is already working on
          your request, and we'll be in touch shortly with all the exciting
          details.
        </p>
        <p>
          <span>Get ready to supercharge your experience!</span>
          <SvgIcon additionalStyles={styles.icon}>
            <IconRocket />
          </SvgIcon>
        </p>
      </div>
    </Modal>
  );
};
