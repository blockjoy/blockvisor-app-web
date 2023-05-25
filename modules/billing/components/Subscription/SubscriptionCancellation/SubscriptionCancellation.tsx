import { ChangeEvent, useState } from 'react';
import { useSubscription } from '@modules/billing/hooks/useSubscription';
import { RadioButton } from '@shared/components/Forms/VanillaForm/RadioButton/RadioButton';
import { Button, Input, formatDate } from '@shared/index';
import { styles } from './SubscriptionCancellation.styles';
import { RadioButtonGroup } from '@shared/components/Forms/VanillaForm/RadioButton/RadioButtonGroup';
import { ButtonGroup } from '@shared/components/Buttons/ButtonGroup/ButtonGroup';

type SubscriptionCancellationProps = {
  handleBack: VoidFunction;
};

export const SubscriptionCancellation = ({
  handleBack,
}: SubscriptionCancellationProps) => {
  const [endOfTerm, setEndOfTerm] = useState<boolean>(true);

  const { subscription, cancelSubscription, subscriptionLoadingState } =
    useSubscription();

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
            {formatDate(subscription.current_term_end)}.
          </p>
        </RadioButton>
      </RadioButtonGroup>
      <ButtonGroup type="flex">
        <Button style="outline" size="small" onClick={handleBack}>
          Back
        </Button>
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
      </ButtonGroup>
    </div>
  );
};
