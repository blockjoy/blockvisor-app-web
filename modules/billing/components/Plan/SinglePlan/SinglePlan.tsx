import { styles } from './SinglePlan.styles';
import IconCheckmark from '@public/assets/icons/checkmark-12.svg';
import { Button, formatCurrency } from '@shared/index';
import { capitalize } from 'utils/capitalize';

export type SinglePlanProps = {
  plan: IPlan;
};

const FEATURES_HEADINGS = {
  max_nodes: 'Nodes',
  max_organizations: 'Organizations',
  max_collaborators: 'Collaborators',
  support_type: 'Support',
};

export const SinglePlan = ({ plan }: SinglePlanProps) => {
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
          {Object.keys(plan?.metadata.features).map((featureKey: string) => (
            <li key={featureKey} css={styles.listItem}>
              <IconCheckmark />
              <span>
                {capitalize(plan?.metadata.features[featureKey])}
              </span>{' '}
              <span>{FEATURES_HEADINGS[featureKey]}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button style={plan.metadata.featured ? 'secondary' : 'outline'}>
        Select plan
      </Button>
    </div>
  );
};
