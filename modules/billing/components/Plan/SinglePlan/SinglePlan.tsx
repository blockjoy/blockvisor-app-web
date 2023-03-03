import { styles } from './SinglePlan.styles';
import IconCheckmark from '@public/assets/icons/checkmark-12.svg';
import { Button } from '@shared/index';

export const SinglePlan = () => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.title}>
        <span>Pro</span>
      </div>

      <div css={styles.pricing}>
        <p css={styles.price}>$199,00</p>
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
          <li css={styles.listItem}>
            <IconCheckmark />
            <span>Unlimited Nodes</span>
          </li>
          <li css={styles.listItem}>
            <IconCheckmark />
            <span>Unlimited organizations</span>
          </li>
          <li css={styles.listItem}>
            <IconCheckmark />
            <span>Unlimited collaborators</span>
          </li>
          <li css={styles.listItem}>
            <IconCheckmark />
            <span>24/7 support</span>
          </li>
        </ul>
      </div>

      <Button style="secondary">Select plan</Button>
    </div>
  );
};
