import { ChangeEvent, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { formatters } from '@shared/index';
import {
  ButtonGroup,
  ConfirmDialog,
  RadioButtonGroup,
  RadioButton,
  Button,
  Modal,
} from '@shared/components';
import { styles } from './SubscriptionCancellation.styles';
import { billingAtoms, useSubscriptionLifecycle } from '@modules/billing';

type SubscriptionCancellationProps = {
  handleBack: VoidFunction;
};

export const SubscriptionCancellation = ({
  handleBack,
}: SubscriptionCancellationProps) => {
  const [activeView, setActiveView] = useState<'preview' | 'dialog'>('preview');
  const [endOfTerm, setEndOfTerm] = useState<boolean>(true);

  const { cancelSubscription, subscriptionLoadingState } =
    useSubscriptionLifecycle();

  const subscription = useRecoilValue(billingAtoms.subscription);

  const handleCancellation = () => setActiveView('dialog');
  const onHide = () => setActiveView('preview');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newEndOfTermValue = value === 'true';
    setEndOfTerm(newEndOfTermValue);
  }, []);

  const onConfirm = useCallback(async () => {
    await cancelSubscription({ endOfTerm });

    toast.success('Subscription cancelled');
    handleBack();
  }, [cancelSubscription, handleBack, endOfTerm]);

  const currentEndTerm = formatters.formatTimestamp(
    subscription?.currentPeriodEnd!,
  );

  return activeView === 'preview' ? (
    <Modal
      portalId="modal-subscription-cancellation"
      isOpen={true}
      handleClose={handleBack}
    >
      <div>
        <RadioButtonGroup>
          <RadioButton
            id="cancel"
            name="endOfTerm"
            value={false}
            selectedValue={endOfTerm}
            onChange={handleChange}
          >
            <h5 css={styles.title}>Cancel immediately</h5>
            <p>The subscription will be terminated immediately.</p>
          </RadioButton>
          <RadioButton
            id="delay"
            name="endOfTerm"
            value={true}
            selectedValue={endOfTerm}
            onChange={handleChange}
          >
            <h5 css={styles.title}>Cancel at the end of term</h5>
            <p>The subscription will be terminated on {currentEndTerm}.</p>
          </RadioButton>
        </RadioButtonGroup>

        <ButtonGroup type="flex">
          <Button style="outline" size="small" onClick={handleBack}>
            Back
          </Button>
          <Button
            loading={subscriptionLoadingState !== 'finished'}
            size="small"
            style="secondary"
            type="submit"
            onClick={handleCancellation}
          >
            Cancel subscription
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  ) : (
    <ConfirmDialog
      title="Subscription Cancellation"
      message="Cancellation will end all premium services linked to your account. Please confirm if you wish to proceed."
      handleConfirm={onConfirm}
      onHide={onHide}
    />
  );
};
