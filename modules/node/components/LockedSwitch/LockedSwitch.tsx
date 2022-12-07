import { styles } from './LockedSwitch.styles';
import IconLock from '@public/assets/icons/lock-12.svg';

export const LockedSwitch = () => (
  <div css={styles.wrapper}>
    <div css={styles.switch}>
      <div css={styles.handle} />
    </div>
    <div css={styles.badge}>
      <IconLock />
      <div css={styles.tooltip}>
        You will be able to disable Auto Updates soon.
      </div>
    </div>
  </div>
);
