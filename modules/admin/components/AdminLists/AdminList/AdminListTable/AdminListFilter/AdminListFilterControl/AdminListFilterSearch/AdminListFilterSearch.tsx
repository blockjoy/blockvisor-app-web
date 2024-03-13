import { SvgIcon } from '@shared/components';
import { styles } from './AdminListFilterSearch.styles';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { ChangeEvent } from 'react';

type Props = {
  onSearch: (search: string) => void;
};

export const AdminListFilterSearch = ({ onSearch }: Props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    onSearch(e.target.value);

  return (
    <div css={styles.searchWrapper}>
      <input
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
