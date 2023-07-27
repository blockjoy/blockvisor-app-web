import { ChangeEvent, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { formatters } from '@shared/index';
import { styles } from './SubscriptionCancellation.styles';
import {
  ButtonGroup,
  RadioButtonGroup,
  RadioButton,
  Button,
} from '@shared/components';
import { billingSelectors, useSubscriptionLifecycle } from '@modules/billing';

type SubscriptionCancellationProps = {
  handleBack: VoidFunction;
};

export const SubscriptionCancellation = ({
  handleBack,
}: SubscriptionCancellationProps) => {
  const [endOfTerm, setEndOfTerm] = useState<boolean>(true);

  const { cancelSubscription, subscriptionLoadingState } =
    useSubscriptionLifecycle();

  const subscription = useRecoilValue(billingSelectors.subscription);

  const handleCancellation = useCallback(() => {
    cancelSubscription({ endOfTerm });
    handleBack();
  }, [cancelSubscription, handleBack, endOfTerm]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newEndOfTermValue = value === 'true';
    setEndOfTerm(newEndOfTermValue);
  }, []);

  const currentEndTerm = formatters.formatDate(subscription?.current_term_end!);

  return (
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
        <Button
          loading={subscriptionLoadingState !== 'finished'}
          size="small"
          style="secondary"
          type="submit"
          onClick={handleCancellation}
        >
          Cancel subscription
        </Button>
        <Button style="outline" size="small" onClick={handleBack}>
          Back
        </Button>
      </ButtonGroup>
    </div>
  );
};
