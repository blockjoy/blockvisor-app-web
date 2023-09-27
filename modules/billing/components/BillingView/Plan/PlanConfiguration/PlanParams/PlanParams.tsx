import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { formatters } from '@shared/index';
import { RadioButton, RadioButtonGroup } from '@shared/components';
import {
  BILLING_PERIOD,
  billingSelectors,
  calcNextRenewDate,
} from '@modules/billing';
import { styles } from './PlanParams.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';

type PlanParamsProps = {
  periodUnit?: string;
  handlePeriodUnit?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PlanParams = ({
  periodUnit,
  handlePeriodUnit,
}: PlanParamsProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  return (
    <>
      {handlePeriodUnit &&
        subscription?.billing_period_unit !== 'year' &&
        Boolean(BILLING_PERIOD.length) && (
          <div css={spacing.bottom.large}>
            <h3 css={styles.headline}>Billing period</h3>
            <RadioButtonGroup>
              {BILLING_PERIOD.map((billingPeriod: BillingPeriod) => (
                <RadioButton
                  key={billingPeriod.id}
                  id={billingPeriod.id}
                  name="periodUnit"
                  value={billingPeriod.id}
                  selectedValue={periodUnit}
                  onChange={handlePeriodUnit}
                >
                  {billingPeriod.title}
                </RadioButton>
              ))}
            </RadioButtonGroup>
          </div>
        )}
      {periodUnit && (
        <div css={spacing.bottom.large}>
          <h3 css={styles.headline}>Auto renew</h3>
          <div css={[flex.display.flex, flex.justify.between]}>
            <p>
              Your subscription will automatically renew on{' '}
              {formatters.formatDate(calcNextRenewDate(periodUnit))}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
