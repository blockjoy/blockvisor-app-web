import { styles } from './AdminSearch.styles';
import { SvgIcon } from '@shared/components';
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import IconSearch from '@public/assets/icons/common/Search.svg';
import router from 'next/router';

type Props = {
  onSearch: (keyword: string) => void;
};

export const AdminSearch = ({ onSearch }: Props) => {
  const { search } = router.query;

  const searchText = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    searchText.current = e.target.value;
  };

  const handleSearch = () => onSearch(searchText.current);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (search && inputRef.current) {
      searchText.current = search as string;
      inputRef.current.defaultValue = search as string;
    }
  }, [router.isReady]);

  return (
    <div css={styles.search}>
      <span css={styles.searchIcon}>
        <SvgIcon isDefaultColor>
          <IconSearch />
        </SvgIcon>
      </span>
      <input
        ref={inputRef}
        css={styles.searchInput}
        type="text"
        onInput={handleSearchChanged}
        onKeyUp={handleKeyUp}
        placeholder="Keyword"
      />
      <button css={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
