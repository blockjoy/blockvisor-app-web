import { Skeleton, SvgIcon } from '@shared/components';
import { styles } from './AdminListHeader.styles';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { AdminHeader } from '@modules/admin/components/AdminHeader/AdminHeader';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { useRouter } from 'next/router';

type Props = {
  icon: React.ReactNode;
  name: string;
  total: number;
  onSearch: (search: string) => void;
};

export const AdminListHeader = ({ name, icon, total, onSearch }: Props) => {
  const router = useRouter();
  const { search } = router.query;

  const searchTerm = useRef('');

  const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    (searchTerm.current = e.target.value);

  const handleSearch = () => onSearch(`${searchTerm.current}%`);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (search) {
      searchTerm.current = search as string;
    }
  }, [router.isReady]);

  return (
    <AdminHeader icon={icon} name={name}>
      <>
        <div css={styles.total}>
          <var css={[styles.totalValue]}>
            {+total > -1 ? total : <Skeleton />}
          </var>
          <span className="tooltip" css={styles.totalTooltip}>
            Total
          </span>
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
            defaultValue={searchTerm.current}
            onInput={handleSearchTermChanged}
            onKeyUp={handleKeyUp}
          />
          <button css={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </>
    </AdminHeader>
  );
};
