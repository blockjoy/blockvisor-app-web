import { styles } from './BlockchainSelectorFooter.styles';
import { spacing } from 'styles/utils.spacing.styles';
import IconSort from '@public/assets/icons/sort-12.svg';
import IconEnter from '@public/assets/icons/enter.svg';

export function BlockchainSelectorFooter() {
  return (
    <div css={[styles.base]}>
      <div css={[styles.wrapper, spacing.right.medium]}>
        <IconEnter />
        <span css={[styles.iconText]}>Add</span>
      </div>
      <div css={styles.wrapper}>
        <IconSort />
        <span css={[styles.iconText]}>Select</span>
      </div>
    </div>
  );
}
