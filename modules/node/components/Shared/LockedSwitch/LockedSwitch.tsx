import { styles } from './LockedSwitch.styles';
import { Tooltip } from '@shared/components';
import IconLock from '@public/assets/icons/common/Lock.svg';

type Props = {
  isChecked?: boolean;
  tooltip?: string;
};

export const LockedSwitch = ({ isChecked = true, tooltip }: Props) => (
  <div css={[styles.wrapper, isChecked && styles.isChecked]}>
    <div css={styles.switch}>
      <div css={styles.handle}>
        <IconLock />
      </div>
    </div>
    {Boolean(tooltip) && (
      <Tooltip customCss={[styles.tooltip]} tooltip={tooltip!} />
    )}
  </div>
);
