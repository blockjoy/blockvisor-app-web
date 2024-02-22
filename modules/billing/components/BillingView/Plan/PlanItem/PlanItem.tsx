import { Item } from 'chargebee-typescript/lib/resources';
import { Button, Checklist } from '@shared/components';
import { styles } from './PlanItem.styles';

export type PlanItemProps = {
  item: Item;
  handleSelect: (plan: Item) => void;
};

export const PlanItem = ({ item, handleSelect }: PlanItemProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.titleWrapper}>
        <span css={styles.title}>{item?.external_name}</span>
      </div>

      <div css={styles.pricing}>
        <p css={styles.price}>${item.metadata?.priceLabel}</p>
        <pre css={styles.priceLabel}>{item.metadata?.priceInfo.join('\n')}</pre>
      </div>

      {item.description && <p css={styles.description}>{item.description}</p>}

      {item.metadata?.features && <Checklist items={item.metadata?.features} />}

      <Button style="outline" onClick={() => handleSelect(item)}>
        Select plan
      </Button>
    </div>
  );
};
