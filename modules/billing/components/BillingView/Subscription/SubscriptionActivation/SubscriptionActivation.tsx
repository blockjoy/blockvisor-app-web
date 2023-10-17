import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { billingSelectors, useSubscriptionLifecycle } from '@modules/billing';
import { Button, ButtonGroup, Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

type SubscriptionActivationProps = {
  handleSubmit?: () => void | Promise<void>;
  handleBack: VoidFunction;
  type?:
    | 'activate-subscription'
    | 'restore-subscription'
    | 'reactivate-subscription';
};

const styles = {
  confirmButton: css`
    min-width: 190px;
  `,
};

export const SubscriptionActivation = ({
  handleSubmit,
  handleBack,
  type = 'activate-subscription',
}: SubscriptionActivationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { restoreSubscription, reactivateSubscription } =
    useSubscriptionLifecycle();

  const handleRestoreSubscription = useCallback(async () => {
    await restoreSubscription(subscription?.id!);
  }, [restoreSubscription, subscription]);

  const handleReactivateSubscription = useCallback(async () => {
    await reactivateSubscription(subscription?.id!);
  }, [reactivateSubscription, subscription]);

  const handleActivation = async () => {
    setIsLoading(true);

    if (handleSubmit) {
      await Promise.resolve(handleSubmit());
    } else if (type === 'restore-subscription') {
      await handleRestoreSubscription();
    } else if (type === 'reactivate-subscription') {
      await handleReactivateSubscription();
    }

    setIsLoading(false);
    handleBack();
  };
  return (
    <Modal
      portalId="modal-subscription-activation"
      isOpen={true}
      handleClose={handleBack}
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
        <Button
          style="primary"
          size="small"
          onClick={handleActivation}
          loading={isLoading}
          customCss={[styles.confirmButton]}
        >
          {type === 'activate-subscription'
            ? 'Confirm & Activate'
            : type === 'reactivate-subscription'
            ? 'Confirm & Reactivate'
            : type === 'restore-subscription'
            ? 'Confirm & Restore'
            : 'Confirm'}
        </Button>
        <Button style="outline" size="small" onClick={handleBack}>
          Cancel
        </Button>
      </ButtonGroup>
    </Modal>
  );
};
