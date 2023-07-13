import { css } from '@emotion/react';
import { Button } from '@shared/components';
import { checkIfValidEmail } from '@shared/utils/validation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { styles } from './TableAdd.styles';

type Props = {
  placeholder?: string;
  placeholderFocused?: string;
  buttonText?: string;
  buttonWidth?: string;
  isLoading: boolean;
  onSubmit: (value: string) => Promise<boolean>;
  isEmail?: boolean;
};

export const TableAdd = ({
  isLoading,
  isEmail,
  buttonText = 'Add',
  buttonWidth = '58px',
  onSubmit,
  placeholder = 'New Organization',
  placeholderFocused,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [value, setValue] = useState('');

  const isValid =
    !isSubmitted && isEmail ? checkIfValidEmail(value) : value.length > 0;

  const handleSubmit = async () => {
    if (isValid) {
      setIsSubmitted(true);
      await onSubmit(value);
      setValue('');
      setIsSubmitted(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter'].includes(e.key)) return;
    handleSubmit();
  };

  return (
    <div css={styles.wrapper}>
      <input
        placeholder={
          isFocused && placeholderFocused ? placeholderFocused : placeholder
        }
        type="text"
        css={styles.input(buttonWidth)}
        autoComplete="off"
        required
        value={value}
        onKeyDown={handleKeyDown}
        onInput={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => (!value.length ? setIsFocused(false) : null)}
      />
      <Button
        disabled={!isValid}
        loading={isLoading}
        style="secondary"
        size="small"
        type="submit"
        css={[
          styles.button,
          css`
            minwidth: ${buttonWidth};
            maxwidth: ${buttonWidth};
            width: ${buttonWidth};
          `,
        ]}
        onClick={handleFormSubmit}
      >
        {buttonText}
      </Button>
    </div>
  );
};
