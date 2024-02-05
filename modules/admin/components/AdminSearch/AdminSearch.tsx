import { styles } from './AdminSearch.styles';
import { SvgIcon } from '@shared/components';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@modules/admin/hooks/useDebounce';
import IconSearch from '@public/assets/icons/common/Search.svg';
import IconClose from '@public/assets/icons/common/Close.svg';
import router from 'next/router';

type Props = {
  onSearch: (keyword: string) => void;
  isDashboardSearch?: boolean;
  placeholder?: string;
};

export const AdminSearch = ({
  onSearch,
  isDashboardSearch,
  placeholder = 'Keyword',
}: Props) => {
  const { search } = router.query;

  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchText, 500);

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ' ') return;
    setSearchText(e.target.value);
  };

  const handleSearch = () => onSearch(searchText);

  const handleClear = () => {
    setSearchText('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (search && inputRef.current) {
      setSearchText(search as string);
      inputRef.current.defaultValue = search as string;
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!isDashboardSearch && searchText !== search) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div css={styles.search}>
      <span css={styles.searchIcon}>
        <SvgIcon isDefaultColor>
          <IconSearch />
        </SvgIcon>
      </span>
      <input
        ref={inputRef}
        css={styles.searchInput(!isDashboardSearch!)}
        type="text"
        onInput={handleSearchChanged}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        value={searchText}
      />
      {isDashboardSearch && (
        <button css={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      )}
      {!isDashboardSearch && !!searchText?.length && (
        <button css={styles.clearButton} onClick={handleClear}>
          <SvgIcon>
            <IconClose />
          </SvgIcon>
        </button>
      )}
    </div>
  );
};
