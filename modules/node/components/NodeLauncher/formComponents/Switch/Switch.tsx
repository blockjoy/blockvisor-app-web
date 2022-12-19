import { FC } from 'react';
import { styles } from './Switch.styles';
import IconLock from '@public/assets/icons/lock-12.svg';

type Props = {
  name: string;
  tooltip: string;
  disabled: boolean;
  onPropertyChanged: (e: any) => void;
};

export const Switch: FC<Props> = ({
  onPropertyChanged,
  tooltip = 'test',
  disabled,
  name,
}) => {
  return (
    <div css={styles.wrapper}>
      <label>
        <input
          disabled={disabled}
          name={name}
          type="checkbox"
          css={styles.input}
          onChange={(e: any) => onPropertyChanged(e)}
        />
        <span className="switch" css={styles.switch}>
          <span className="handle" css={styles.handle}>
            {disabled && <IconLock />}
          </span>
        </span>
      </label>
      <div className="tooltip" css={styles.tooltip}>
        {tooltip}
      </div>
    </div>
  );
};
