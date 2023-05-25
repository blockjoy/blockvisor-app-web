import { ChangeEvent, FC } from 'react';
import { styles } from './Switch.styles';
import IconLock from '@public/assets/icons/common/Lock.svg';
import { Tooltip } from '@shared/components';
import { SerializedStyles } from '@emotion/react';

type Props = {
  checked?: boolean;
  name: string;
  tabIndex?: number;
  tooltip?: string;
  disabled: boolean;
  noBottomMargin?: boolean;
  onPropertyChanged: (e: ChangeEvent<HTMLInputElement>) => void;
  additionalStyles?: SerializedStyles;
};

export const Switch: FC<Props> = ({
  onPropertyChanged,
  tooltip,
  disabled,
  name,
  checked,
  tabIndex,
  noBottomMargin,
  additionalStyles,
}) => {
  return (
    <div
      css={[
        styles.wrapper,
        noBottomMargin && styles.wrapperNoBottomMargin,
        additionalStyles && additionalStyles,
      ]}
    >
      <label tabIndex={tabIndex}>
        <input
          disabled={disabled}
          name={name}
          type="checkbox"
          css={styles.input}
          onChange={(e: any) => onPropertyChanged(e)}
          checked={checked}
        />
        <span className="switch" css={styles.switch}>
          <span className="handle" css={styles.handle}>
            {disabled && <IconLock />}
          </span>
        </span>
      </label>
      {disabled && <Tooltip customCss={[styles.tooltip]} tooltip={tooltip!} />}
    </div>
  );
};
