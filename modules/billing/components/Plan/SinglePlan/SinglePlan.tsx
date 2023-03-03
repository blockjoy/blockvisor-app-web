import { styles } from './SinglePlan.styles';
import IconCheckmark from '@public/assets/icons/checkmark-12.svg';
import { Button } from '@shared/index';

export type SinglePlanProps = {
  plan: any;
};

export const SinglePlan = ({ plan }: SinglePlanProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.title}>
        <span>{plan?.title}</span>
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
        <p>You save 12$/month by choosing the annual plan.</p>
      </div>

      <div css={styles.listContainer}>
        <ul css={styles.list}>
          {plan?.features.map((feature: any) => (
            <li css={styles.listItem}>
              <IconCheckmark />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button style="secondary">Select plan</Button>
    </div>
  );
};
