import { styles } from './SinglePlan.styles';
import { Button } from '@shared/index';
import IconCheckmark from '@public/assets/icons/checkmark-12.svg';
import { Item } from 'chargebee-typescript/lib/resources';
import { BILLING_PLAN_FEATURES } from '@modules/billing/constants/billing';

export type SinglePlanProps = {
  plan: Item;
  handleSelect: (plan: any) => void;
};

export const SinglePlan = ({ plan, handleSelect }: SinglePlanProps) => {
  return (
    <div css={[styles.wrapper, plan.metadata.featured && styles.featured]}>
      <div css={styles.titleWrapper}>
        <span css={styles.title}>{plan?.external_name}</span>
      </div>

      <div css={styles.pricing}>
        <p css={styles.price}>$30.00</p>
        <p css={styles.priceLabel}>
          Per month
          <br />
          Paid anually
        </p>
      </div>

      <div css={styles.priceInfo}>
        <p>{plan.description}</p>
      </div>

      <div css={styles.listContainer}>
        <ul css={styles.list}>
          {BILLING_PLAN_FEATURES.map(
            (feature: string, featureIndex: number) => (
              <li key={featureIndex} css={styles.listItem}>
                <IconCheckmark />
                <span>{feature}</span>
              </li>
            ),
          )}
        </ul>
      </div>
      {/* TODO: add prevent if no payment method has been added */}
      <Button
        style={plan.metadata.featured ? 'secondary' : 'outline'}
        onClick={() => handleSelect(plan)}
      >
        Select plan
      </Button>
    </div>
  );
};
