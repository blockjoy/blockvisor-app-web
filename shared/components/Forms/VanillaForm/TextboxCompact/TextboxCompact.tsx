import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { styles } from './TextboxCompact.styles';

type Props = {
  isRequired?: boolean;
  isError?: boolean;
  defaultValue?: string;
  name: string;
  tabIndex?: number;
  type: string;
  noBottomMargin?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (name: string, value: string) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const TextboxCompact = ({
  defaultValue,
  name,
  isRequired,
  isError,
  type = 'text',
  tabIndex,
  noBottomMargin = false,
  placeholder,
  autoFocus,
  onChange,
  onKeyUp,
}: Props) => {
  const [value, setValue] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
    setValue(e.target.value);
  };

  return (
    <div css={styles.wrapper}>
      <input
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        required={isRequired}
        className={value?.length || defaultValue?.length ? 'has-value' : ''}
        css={[
          styles.input(noBottomMargin),
          isRequired && styles.inputRequired,
          value === '' && isRequired && styles.inputRequiredAnimation,
          isError && styles.inputError,
        ]}
        onChange={handleChange}
        onKeyUp={onKeyUp}
      />
      <label css={[styles.label, isError && styles.labelError]}>
        {placeholder}
        {isRequired && <span css={styles.asterix}>*</span>}
      </label>
    </div>
  );
};
