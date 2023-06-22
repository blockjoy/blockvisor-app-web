import { ChangeEvent, useState } from 'react';
import { formatters } from '@shared/index';
import { styles } from './SubscriptionCancellation.styles';
import {
  ButtonGroup,
  RadioButtonGroup,
  RadioButton,
  Button,
} from '@shared/components';
import { useRecoilValue } from 'recoil';
import { billingSelectors, useSubscription } from '@modules/billing';

type SubscriptionCancellationProps = {
  handleBack: VoidFunction;
};

export const SubscriptionCancellation = ({
  handleBack,
}: SubscriptionCancellationProps) => {
  const [endOfTerm, setEndOfTerm] = useState<boolean>(true);

  const { cancelSubscription, subscriptionLoadingState } = useSubscription();

  const subscription = useRecoilValue(billingSelectors.subscription);

  const handleCancellation = () => {
    cancelSubscription({ endOfTerm });
    handleBack();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const newEndOfTermValue = value === 'true';
    setEndOfTerm(newEndOfTermValue);
  };

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
          <p>
            The subscription will be terminated on{' '}
            {formatters.formatDate(subscription?.current_term_end!)}.
          </p>
        </RadioButton>
      </RadioButtonGroup>
      <ButtonGroup type="flex">
        <Button
          loading={subscriptionLoadingState !== 'finished'}
          size="small"
          display="inline"
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
