import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { styles } from './Switch.styles';
import { Tooltip } from '@shared/components';
import IconLock from '@public/assets/icons/common/Lock.svg';

type SwitchProps = {
  checked?: boolean;
  name: string;
  tabIndex?: number;
  tooltip?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  noBottomMargin?: boolean;
  onChange?: (name: string, value: boolean) => void;
};

export const Switch = ({
  onChange,
  tooltip,
  disabled,
  name,
  checked,
  tabIndex,
  defaultChecked,
  noBottomMargin,
}: SwitchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange?.(e.target.name, e.target.checked);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const newChecked = !inputRef.current?.checked;
      inputRef.current.checked = newChecked;
      onChange?.(name, newChecked);
    }
  };

  return (
    <div css={[styles.wrapper, noBottomMargin && styles.wrapperNoBottomMargin]}>
      <label tabIndex={tabIndex}>
        <input
          ref={inputRef}
          disabled={disabled}
          name={name}
          type="checkbox"
          css={styles.input}
          onChange={handleChange}
          checked={checked}
          defaultChecked={defaultChecked}
          onKeyDown={handleKeyDown}
        />
        <span className="switch" css={styles.switch}>
          <span className="handle" css={styles.handle}>
            {disabled && <IconLock />}
          </span>
        </span>
      </label>
      {disabled && !!tooltip && (
        <Tooltip customCss={[styles.tooltip]} tooltip={tooltip} />
      )}
    </div>
  );
};
