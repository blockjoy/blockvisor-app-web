import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  isRequired: boolean;
  defaultValue?: string;
  name: string;
  tabIndex?: number;
  type: string;
  noBottomMargin?: boolean;
  onChange: (name: string, value: string) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const Textbox = ({
  onChange,
  onKeyUp,
  defaultValue,
  name,
  isRequired,
  type = 'text',
  tabIndex,
  noBottomMargin = false,
}: Props) => {
  const [value, setValue] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
    setValue(e.target.value);
  };

  return (
    <div css={styles.wrapper}>
      <input
        tabIndex={tabIndex}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        required={isRequired}
        css={[
          styles.input(noBottomMargin),
          isRequired && styles.inputRequired,
          value === '' && isRequired && styles.inputRequiredAnimation,
        ]}
        placeholder="Enter a value"
        onChange={handleChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};
