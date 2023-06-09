import { styles } from './LockedSwitch.styles';
import IconLock from '@public/assets/icons/common/Lock.svg';
import { FC } from 'react';
import { Tooltip } from '@shared/components';

type Props = {
  isChecked?: boolean;
  tooltip?: string;
};

export const LockedSwitch: FC<Props> = ({
  isChecked = true,
  tooltip = 'You will be able to disable Auto Updates after BETA.',
}) => (
  <div css={[styles.wrapper, isChecked && styles.isChecked]}>
    <div css={styles.switch}>
      <div css={styles.handle}>
        <IconLock />
      </div>
    </div>
    <Tooltip customCss={[styles.tooltip]} tooltip={tooltip} />
  </div>
);
