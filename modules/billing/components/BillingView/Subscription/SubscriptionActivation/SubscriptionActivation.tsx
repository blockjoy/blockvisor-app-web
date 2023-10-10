import { billingSelectors } from '@modules/billing';
import { Button, ButtonGroup, Modal } from '@shared/components';
import { useRecoilValue } from 'recoil';
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
  const isActiveSubscription = useRecoilValue(
    billingSelectors.isActiveSubscription,
  );

  return (
    <Modal
      portalId="modal-subscription-activation"
      isOpen={true}
      handleClose={handleHide}
    >
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        {isActiveSubscription
          ? 'Subscription Activation'
          : 'Subscription Reactivation'}
      </h2>
      <div css={[spacing.top.medium, spacing.bottom.medium]}>
        <p css={spacing.bottom.small}>
          {isActiveSubscription
            ? 'You are about to activate the BlockJoy subscription.'
            : 'Your subscription will be reactivated.'}
        </p>
        <p css={spacing.bottom.medium}>
          {isActiveSubscription
            ? 'Once activated, you will have access to all our premium features.'
            : 'Once reactivated, you will regain access to all our premium features'}
        </p>
        <p>Confirm to gain full premium access?</p>
      </div>
      <ButtonGroup type="flex">
        <Button style="primary" size="small" onClick={handleSubmit}>
          {isActiveSubscription ? 'Confirm & Activate' : 'Confirm & Reactivate'}
        </Button>
        <Button style="outline" size="small" onClick={handleHide}>
          Cancel
        </Button>
      </ButtonGroup>
    </Modal>
  );
};
