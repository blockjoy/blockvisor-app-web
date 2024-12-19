import { ChangeEvent, useEffect, useRef, KeyboardEvent } from 'react';
import { styles } from './DropdownSearch.styles';

type DropdownSearchProps = {
  name: string;
  value: string;
  isOpen?: boolean;
  isEmpty?: boolean;
  isValid?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: string) => void;
};

export const DropdownSearch = ({
  name,
  value,
  isOpen,
  isEmpty,
  isValid,
  placeholder,
  emptyMessage,
  handleChange,
  handleSubmit,
}: DropdownSearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && searchRef?.current) {
        searchRef.current?.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleKeyDown = Boolean(handleSubmit)
    ? (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          if (!isValid) return;

          handleSubmit?.(e.target.value);
        }
      }
    : null;

  const isEmptyValue = !Boolean(value.length);

  return (
    <>
      <input
        ref={searchRef}
        css={styles.input(isValid, isEmptyValue, isEmpty)}
        name={name}
        type="text"
        placeholder={placeholder ?? 'Search...'}
        value={value}
        autoComplete="off"
        onChange={handleChange}
        {...(handleKeyDown && { onKeyDown: handleKeyDown })}
      />
      {isEmpty && (
        <p css={styles.empty(isValid, isEmptyValue)}>
          {emptyMessage ?? 'No results found'}
        </p>
      )}
    </>
  );
};
