import { ChangeEvent, KeyboardEvent } from 'react';
import { styles } from './Switch.styles';
import IconLock from '@public/assets/icons/common/Lock.svg';
import { Tooltip } from '@shared/components';

type SwitchProps = {
  checked?: boolean;
  name: string;
  tabIndex?: number;
  tooltip?: string;
  disabled: boolean;
  noBottomMargin?: boolean;
  onChange: (name: string, value: boolean) => void;
};

export const Switch = ({
  onChange,
  tooltip,
  disabled,
  name,
  checked,
  tabIndex,
  noBottomMargin,
}: SwitchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.name, e.target.checked);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onChange(name, !checked);
  };

  return (
    <div css={[styles.wrapper, noBottomMargin && styles.wrapperNoBottomMargin]}>
      <label tabIndex={tabIndex}>
        <input
          disabled={disabled}
          name={name}
          type="checkbox"
          css={styles.input}
          onChange={handleChange}
          checked={checked}
          onKeyDown={handleKeyDown}
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
