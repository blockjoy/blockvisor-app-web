import { ChangeEvent, useEffect, useRef, KeyboardEvent } from 'react';
import { styles } from './DropdownSearch.styles';

type DropdownSearchProps = {
  name: string;
  value: string;
  isOpen?: boolean;
  isEmpty?: boolean;
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
        if (e.key === 'Enter') handleSubmit?.(e.target.value);
      }
    : null;

  return (
    <>
      <input
        ref={searchRef}
        css={styles.input}
        name={name}
        type="text"
        placeholder={placeholder ?? 'Search...'}
        value={value}
        autoComplete="off"
        onChange={handleChange}
        {...(handleKeyDown && { onKeyDown: handleKeyDown })}
      />
      {isEmpty && (
        <p css={styles.empty}>{emptyMessage ?? 'No results found'}</p>
      )}
    </>
  );
};
