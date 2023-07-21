import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { formatters } from '@shared/index';
import { RadioButton, RadioButtonGroup, Switch } from '@shared/components';
import { billingSelectors, calcNextAutoRenew } from '@modules/billing';
import { styles } from './PlanParams.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';

type PlanParamsProps = {
  periodUnit?: string;
  handlePeriodUnit?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoRenew?: boolean;
  handleAutoRenew?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PlanParams = ({
  periodUnit,
  handlePeriodUnit,
  autoRenew,
  handleAutoRenew,
}: PlanParamsProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  return (
    <>
      {handlePeriodUnit && subscription?.billing_period_unit !== 'year' && (
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
      {autoRenew !== undefined && handleAutoRenew !== undefined && (
        <div css={spacing.bottom.large}>
          <h3 css={styles.headline}>Auto renew</h3>
          <div css={[flex.display.flex, flex.justify.between]}>
            {periodUnit && (
              <p css={styles.renewText}>
                Your subscription will automatically renew on{' '}
                {formatters.formatDate(calcNextAutoRenew(periodUnit))}
              </p>
            )}
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
      )}
    </>
  );
};
