import { css } from '@emotion/react';
import { Button, SvgIcon } from '@shared/components';
import { checkIfValidEmail } from '@shared/utils/validation';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { styles } from './TableAdd.styles';
import IconClose from '@public/assets/icons/common/Close.svg';

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

  const inputRef = useRef<HTMLInputElement>(null);

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
    if (e.key === 'Escape') {
      handleCancel();
      inputRef.current?.blur();
      return;
    }

    if (e.key !== 'Enter') return;

    handleSubmit();
  };

  const handleBlur = () => {
    if (value.length) return;
    setIsFocused(false);
  };

  const handleCancel = () => {
    setValue('');
    setIsFocused(false);
  };

  return (
    <div css={styles.wrapper}>
      <input
        ref={inputRef}
        tabIndex={1}
        placeholder={isFocused && placeholderFocused ? placeholderFocused : ''}
        type="text"
        css={styles.input(buttonWidth, value.length > 0)}
        autoComplete="off"
        autoCorrect="off"
        value={value}
        onKeyDown={handleKeyDown}
        onInput={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      {!value.length && !isFocused && (
        <Button
          className="add-button"
          size="small"
          style="outline"
          css={styles.addButton}
        >
          {placeholder}
        </Button>
      )}
      {!!value.length || isFocused ? (
        <div css={styles.buttons}>
          <Button
            tabIndex={3}
            style="icon"
            onClick={handleCancel}
            tooltip="Cancel"
          >
            <SvgIcon size="18px">
              <IconClose />
            </SvgIcon>
          </Button>
          <Button
            tabIndex={2}
            disabled={!isValid}
            loading={isLoading}
            style="secondary"
            size="small"
            type="submit"
            className="confirm-button"
            css={[
              styles.confirmButton,
              css`
                min-width: ${buttonWidth};
                max-width: ${buttonWidth};
                width: ${buttonWidth};
              `,
            ]}
            onClick={handleFormSubmit}
          >
            {buttonText}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
