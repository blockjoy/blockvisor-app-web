import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './PlanParams.styles';
import { formatters } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
import { calcNextRenewDate } from '@modules/billing';

type PlanParamsInfoProps = {
  periodUnit: string;
};

export const PlanParamsInfo = ({ periodUnit }: PlanParamsInfoProps) => {
  return (
    <div css={spacing.bottom.large}>
      <h3 css={styles.headline}>Auto renew</h3>
      <div css={[flex.display.flex, flex.justify.between]}>
        <p>
          Your subscription will automatically renew on{' '}
          {formatters.formatDate(calcNextRenewDate(periodUnit))}
        </p>
      </div>
    </div>
  );
};
