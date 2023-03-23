import { styles } from './SinglePlan.styles';
import { Button, formatCurrency } from '@shared/index';
import { getPlanFeatures } from '@modules/billing';
import IconCheckmark from '@public/assets/icons/checkmark-12.svg';

export type SinglePlanProps = {
  plan: IPlan;
  handleSelect: (plan: IPlan) => void;
};

export const SinglePlan = ({ plan, handleSelect }: SinglePlanProps) => {
  const planFeatures = getPlanFeatures(plan?.metadata.features);

  return (
    <div css={[styles.wrapper, plan.metadata.featured && styles.featured]}>
      <div css={styles.titleWrapper}>
        <span css={styles.title}>{plan?.nickname}</span>
        {plan.metadata.featured && (
          <span css={[styles.title, styles.featuredTitle]}>Best Value</span>
        )}
      </div>

      <div css={styles.pricing}>
        <p css={styles.price}>{formatCurrency(plan?.amount)}</p>
        <p css={styles.priceLabel}>
          Per month
          <br />
          Paid anually
        </p>
      </div>

      <div css={styles.priceInfo}>
        <p>{plan.statement_descriptor}</p>
      </div>

      <div css={styles.listContainer}>
        <ul css={styles.list}>
          {planFeatures.map((feature: string, featureIndex: number) => (
            <li key={featureIndex} css={styles.listItem}>
              <IconCheckmark />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        style={plan.metadata.featured ? 'secondary' : 'outline'}
        onClick={() => handleSelect(plan)}
      >
        Select plan
      </Button>
    </div>
  );
};
