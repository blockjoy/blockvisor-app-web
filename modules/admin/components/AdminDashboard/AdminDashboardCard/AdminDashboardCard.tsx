import { styles } from './AdminDashboardCard.styles';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { SvgIcon } from '@shared/components';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  icon: React.ReactNode;
  getTotal: () => Promise<number>;
};

export const AdminDashboardCard = ({ name, icon, getTotal }: Props) => {
  const router = useRouter();
  const searchText = useRef('');
  const [total, setTotal] = useState<number>();

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    searchText.current = e.target.value;
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () =>
    router.push({
      pathname: '/admin',
      query: {
        name: name.toLowerCase(),
        page: 0,
        search: searchText.current,
      },
    });

  useEffect(() => {
    (async () => {
      const response = await getTotal();
      setTotal(response);
    })();
  }, []);

  return (
    <article css={styles.card}>
      <div css={styles.cardTitle}>
        <span css={styles.cardIcon}>
          <SvgIcon size="20px"> {icon}</SvgIcon>
        </span>
        <div>
          <label css={styles.cardLabel}>{name}</label>
          <var css={styles.cardValue}>{total}</var>
        </div>
      </div>

      <div css={styles.search}>
        <span css={styles.searchIcon}>
          <SvgIcon isDefaultColor>
            <IconSearch />
          </SvgIcon>
        </span>
        <input
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
    </article>
  );
};
