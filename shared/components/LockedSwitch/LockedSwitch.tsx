import { styles } from './LockedSwitch.styles';
import IconLock from '@public/assets/icons/lock-12.svg';
import { FC } from 'react';

type Props = {
  isChecked?: boolean;
  tooltip?: string;
};

export const LockedSwitch: FC<Props> = ({
  isChecked = true,
  tooltip = 'You will be able to disable Auto Updates soon.',
}) => (
  <div css={[styles.wrapper, isChecked && styles.isChecked]}>
    <div css={styles.switch}>
      <div css={styles.handle}>
        <IconLock />
      </div>
    </div>
    <div className="tooltip" css={styles.tooltip}>
      {tooltip}
    </div>
  </div>
);
