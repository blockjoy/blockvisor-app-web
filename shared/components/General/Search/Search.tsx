import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { SerializedStyles } from '@emotion/react';
import { useDebounce } from '@shared/index';
import { SvgIcon } from '@shared/components';
import { styles } from './Search.styles';
import IconSearch from '@public/assets/icons/common/Search.svg';
import IconClose from '@public/assets/icons/common/Close.svg';

export type SearchVersion = 'instant' | 'manual' | 'submit';
export type SearchSize = 'small' | 'regular';

type SearchProps = {
  value?: string;
  placeholder?: string;
  version?: SearchVersion;
  size?: SearchSize;
  additionalStyles?: SerializedStyles;
  onInput?: (keyword: string) => void;
  onSearch?: (keyword: string) => void;
};

export const Search = ({
  value = '',
  placeholder = 'Search',
  version = 'manual',
  size = 'regular',
  additionalStyles,
  onInput,
  onSearch,
}: SearchProps) => {
  const params = useSearchParams();
  const searchParam = params.get('search');

  const currentParam = useRef(searchParam ?? value);

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState(searchParam ?? value);
  const debouncedSearchTerm = useDebounce(searchText, 500);

  useEffect(() => {
    if (
      version === 'instant' &&
      searchText !== searchParam &&
      currentParam.current !== debouncedSearchTerm
    ) {
      onSearch?.(debouncedSearchTerm);
      currentParam.current = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onInput?.(e.target.value);
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && version === 'submit') handleSearch();
  };

  const handleSearch = () => onSearch?.(searchText);

  const handleClear = () => {
    setSearchText('');
    onSearch?.('');
    onInput?.('');
    inputRef.current?.focus();
    currentParam.current = '';
  };

  return (
    <div css={[styles.search, additionalStyles && additionalStyles]}>
      <span css={styles.searchIcon(size)}>
        <SvgIcon isDefaultColor size={size === 'small' ? '12px' : '16px'}>
          <IconSearch />
        </SvgIcon>
      </span>
      <input
        ref={inputRef}
        css={styles.searchInput(version, size)}
        type="text"
        onInput={handleSearchInput}
        {...(version === 'submit' && {
          onKeyUp: handleSubmit,
        })}
        placeholder={placeholder}
        value={version === 'manual' ? value : searchText}
        autoComplete="off"
      />
      {version === 'submit' && (
        <button css={styles.searchButton} onClick={handleSearch} type="button">
          Search
        </button>
      )}
      {version !== 'submit' && searchText.length ? (
        <button css={styles.clearButton} onClick={handleClear} type="button">
          <SvgIcon isDefaultColor>
            <IconClose />
          </SvgIcon>
        </button>
      ) : null}
    </div>
  );
};
