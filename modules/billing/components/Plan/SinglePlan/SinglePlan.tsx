import { styles } from './SinglePlan.styles';
import IconCheckmark from '@public/assets/icons/checkmark-12.svg';
import { Button } from '@shared/index';

export type SinglePlanProps = {
  plan: any;
};

export const SinglePlan = ({ plan }: SinglePlanProps) => {
  return (
    <div css={[styles.wrapper, plan.featured && styles.featured]}>
      <div css={styles.titleWrapper}>
        <span css={styles.title}>{plan?.title}</span>
        {plan.featured && (
          <span css={[styles.title, styles.featuredTitle]}>Best Value</span>
        )}
      </div>

      <div css={styles.pricing}>
        <p css={styles.price}>{plan?.pricing}</p>
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
          {plan?.features.map((feature: any, featureIndex: number) => (
            <li key={featureIndex} css={styles.listItem}>
              <IconCheckmark />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button style={plan.featured ? 'secondary' : 'outline'}>
        Select plan
      </Button>
    </div>
  );
};
