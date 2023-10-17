import { SvgIcon } from '@shared/components';
import { styles } from './AdminCardHeader.styles';
import { KeyboardEvent, useRef } from 'react';
import IconSearch from '@public/assets/icons/common/Search.svg';

type Props = {
  icon: React.ReactNode;
  name: string;
  total: string;
  onSearch: (search: string) => void;
};

export const AdminCardHeader = ({ name, icon, total, onSearch }: Props) => {
  const searchTerm = useRef('');

  const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    (searchTerm.current = e.target.value);

  const handleSearch = () => onSearch(`${searchTerm.current}%`);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header css={styles.cardHeader}>
      <span css={styles.cardIcon}>
        <SvgIcon size="16px">{icon}</SvgIcon>
      </span>
      <h2 css={styles.cardTitle}>{name}</h2>
      <div css={styles.total}>
        <div>
          <var css={[styles.totalValue]}>{total}</var>
          <h3 css={styles.totalLabel}>Total</h3>
        </div>
      </div>
      <div css={styles.search}>
        <span css={styles.searchIcon}>
          <SvgIcon isDefaultColor>
            <IconSearch />
          </SvgIcon>
        </span>
        <input
          placeholder="Keyword"
          css={styles.searchInput}
          type="text"
          onInput={handleSearchTermChanged}
          onKeyUp={handleKeyUp}
        />
        <button css={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </header>
  );
};
