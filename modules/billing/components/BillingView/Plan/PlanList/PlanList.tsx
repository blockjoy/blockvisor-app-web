import { styles } from './PlanList.styles';
import { Button, SvgIcon } from '@shared/index';
import IconCheckmark from '@public/assets/icons/common/Checkmark.svg';
import { Item } from 'chargebee-typescript/lib/resources';
import { BILLING_PLAN_FEATURES } from '@modules/billing/constants/billing';

export type PlanListProps = {
  item: Item;
  handleSelect: (plan: Item) => void;
};

export const PlanList = ({ item, handleSelect }: PlanListProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.titleWrapper}>
        <span css={styles.title}>{item?.external_name}</span>
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
        <p>{item.description}</p>
      </div>

      <div css={styles.listContainer}>
        <ul css={styles.list}>
          {BILLING_PLAN_FEATURES.map(
            (feature: string, featureIndex: number) => (
              <li key={featureIndex} css={styles.listItem}>
                <SvgIcon size="12px" isDefaultColor>
                  <IconCheckmark />
                </SvgIcon>
                <span>{feature}</span>
              </li>
            ),
          )}
        </ul>
      </div>
      {/* TODO: add prevent if no payment method has been added */}
      <Button style="outline" onClick={() => handleSelect(item)}>
        Select plan
      </Button>
    </div>
  );
};
