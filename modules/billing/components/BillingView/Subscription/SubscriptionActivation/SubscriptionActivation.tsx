import { Button, ButtonGroup, Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

type SubscriptionActivationProps = {
  handleSubmit: VoidFunction;
  handleHide: VoidFunction;
};

export const SubscriptionActivation = ({
  handleSubmit,
  handleHide,
}: SubscriptionActivationProps) => {
  return (
    <Modal
      portalId="modal-subscription-activation"
      isOpen={true}
      handleClose={handleHide}
    >
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        Subscription Activation
      </h2>
      <div css={[spacing.top.medium, spacing.bottom.medium]}>
        <p css={spacing.bottom.small}>
          You are about to activate the BlockJoy subscription.
        </p>
        <p css={spacing.bottom.medium}>
          Once activated, you will have access to all our premium features.
        </p>
        <p>Confirm to gain full premium access?</p>
      </div>
      <ButtonGroup type="flex">
        <Button style="primary" size="small" onClick={handleSubmit}>
          Confirm & Activate
        </Button>
        <Button style="outline" size="small" onClick={handleHide}>
          Cancel
        </Button>
      </ButtonGroup>
    </Modal>
  );
};
