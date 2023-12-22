import { ChangeEvent, useEffect, useRef } from 'react';
import { styles } from './DropdownSearch.styles';

type DropdownSearchProps = {
  name: string;
  value: string;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  isEmpty?: boolean;
};

export const DropdownSearch = ({
  name,
  value,
  placeholder,
  handleChange,
  isOpen,
  isEmpty,
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

  return (
    <>
      <input
        ref={searchRef}
        css={styles.input}
        name={name}
        type="text"
        placeholder={placeholder ?? 'Search...'}
        value={value}
        onChange={handleChange}
      />
      {isEmpty && <p css={styles.empty}>No results found</p>}
    </>
  );
};
