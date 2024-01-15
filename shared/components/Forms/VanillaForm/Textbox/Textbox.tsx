import { ChangeEvent, KeyboardEvent } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  isRequired: boolean;
  defaultValue?: string;
  name: string;
  tabIndex?: number;
  type: string;
  noBottomMargin?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const Textbox = ({
  onChange,
  onKeyUp,
  defaultValue = '',
  name,
  isRequired,
  type = 'text',
  tabIndex,
  noBottomMargin = false,
}: Props) => {
  return (
    <div css={styles.wrapper}>
      <input
        tabIndex={tabIndex}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        required={isRequired}
        css={[styles.input(noBottomMargin), isRequired && styles.inputRequired]}
        placeholder="Enter a value"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};
