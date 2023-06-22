import { formatters } from '@shared/index';
import { RadioButton, RadioButtonGroup, Switch } from '@shared/components';
import { calcNextAutoRenew } from '@modules/billing';
import { styles } from './PlanParams.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';

type PlanParams = {
  periodUnit?: any;
  handlePeriodUnit?: any;
  autoRenew?: any;
  handleAutoRenew?: any;
};

export const PlanParams = ({
  periodUnit,
  handlePeriodUnit,
  autoRenew,
  handleAutoRenew,
}: PlanParams) => {
  return (
    <>
      {handlePeriodUnit && (
        <div css={spacing.bottom.large}>
          <h3 css={styles.headline}>Billing period</h3>
          <RadioButtonGroup>
            <RadioButton
              id="month"
              name="periodUnit"
              value="month"
              selectedValue={periodUnit}
              onChange={handlePeriodUnit}
            >
              Monthly
            </RadioButton>
            <RadioButton
              id="year"
              name="periodUnit"
              value="year"
              selectedValue={periodUnit}
              onChange={handlePeriodUnit}
            >
              Yearly
            </RadioButton>
          </RadioButtonGroup>
        </div>
      )}
      <div css={spacing.bottom.large}>
        <h3 css={styles.headline}>Auto renew</h3>
        <div css={[flex.display.flex, flex.justify.between]}>
          <p css={styles.renewText}>
            Your subscription will automatically renew on{' '}
            {formatters.formatDate(calcNextAutoRenew(periodUnit))}
          </p>
          <Switch
            name="autoRenew"
            additionalStyles={styles.renewSwitch}
            disabled={false}
            tooltip="Subscription's auto renewal"
            checked={autoRenew}
            onPropertyChanged={handleAutoRenew}
          />
        </div>
      </div>
    </>
  );
};
