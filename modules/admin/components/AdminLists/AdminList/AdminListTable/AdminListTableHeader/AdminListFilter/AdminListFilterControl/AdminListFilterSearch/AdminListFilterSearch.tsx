import { SvgIcon } from '@shared/components';
import { styles } from './AdminListFilterSearch.styles';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { ChangeEvent, useLayoutEffect, useRef } from 'react';

type Props = {
  onSearch: (search: string) => void;
  shouldAutoFocus?: boolean;
};

export const AdminListFilterSearch = ({ onSearch, shouldAutoFocus }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    onSearch(e.target.value);

  useLayoutEffect(() => {
    if (shouldAutoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [shouldAutoFocus]);

  return (
    <div css={styles.searchWrapper}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search"
        onInput={handleSearch}
        css={styles.searchInput}
      />
      <SvgIcon
        size="14px"
        additionalStyles={[styles.searchIcon]}
        isDefaultColor
      >
        <IconSearch />
      </SvgIcon>
    </div>
  );
};
