import { FC } from 'react';
import { styles } from './Switch.styles';
import IconLock from '@public/assets/icons/lock-12.svg';
import { Tooltip } from '@shared/components';
import { SerializedStyles } from '@emotion/react';

type Props = {
  name: string;
  tabIndex?: number;
  tooltip: string;
  disabled: boolean;
  checked?: boolean;
  onPropertyChanged: (e: any) => void;
  additionalStyles?: SerializedStyles;
};

export const Switch: FC<Props> = ({
  onPropertyChanged,
  tooltip = 'test',
  disabled,
  name,
  checked = false,
  tabIndex,
  additionalStyles,
}) => {
  return (
    <div css={[styles.wrapper, additionalStyles && additionalStyles]}>
      <label tabIndex={tabIndex}>
        <input
          disabled={disabled}
          name={name}
          type="checkbox"
          checked={checked}
          css={styles.input}
          onChange={(e: any) => onPropertyChanged(e)}
        />
        <span className="switch" css={styles.switch}>
          <span className="handle" css={styles.handle}>
            {disabled && <IconLock />}
          </span>
        </span>
      </label>
      {disabled && <Tooltip customCss={[styles.tooltip]} tooltip={tooltip} />}
    </div>
  );
};
