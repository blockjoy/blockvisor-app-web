import { Button, Checklist } from '@shared/components';
import { PLAN_ITEM } from '@modules/billing';
import { styles } from './PlanItem.styles';

type PlanItemProps = {
  handleSelect: VoidFunction;
};

export const PlanItem = ({ handleSelect }: PlanItemProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.titleWrapper}>
        <span css={styles.title}>{PLAN_ITEM.title}</span>
      </div>

      <div css={styles.pricing}>
        <p css={styles.price}>${PLAN_ITEM.priceLabel}</p>
        <pre css={styles.priceLabel}>{PLAN_ITEM.priceInfo.join('\n')}</pre>
      </div>

      {PLAN_ITEM.description && (
        <p css={styles.description}>{PLAN_ITEM.description}</p>
      )}

      {PLAN_ITEM.features && <Checklist items={PLAN_ITEM.features} />}

      <Button style="outline" onClick={handleSelect}>
        Select plan
      </Button>
    </div>
  );
};
