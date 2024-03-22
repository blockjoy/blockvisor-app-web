import { ChangeEvent } from 'react';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { styles } from './ListSearch.styles';

type ListSearchProps = {
  name: string;
  value: string;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (isFocus: boolean) => void;
};

export const ListSearch = ({
  name,
  value,
  placeholder = 'Search...',
  handleChange,
  handleFocus,
}: ListSearchProps) => {
  return (
    <div css={styles.searchWrapper}>
      <input
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        name={name}
        css={styles.searchBox}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => handleFocus?.(true)}
        onBlur={() => handleFocus?.(false)}
      />
      <span css={styles.searchIcon}>
        <IconSearch />
      </span>
    </div>
  );
};
