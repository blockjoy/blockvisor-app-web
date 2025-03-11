import { ChangeEvent } from 'react';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { styles } from './ListSearch.styles';
import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';

type ListSearchProps = {
  name: string;
  value: string;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (isFocus: boolean) => void;
  additionalStyles?:
    | ((theme: ITheme) => SerializedStyles)[]
    | SerializedStyles[];
};

export const ListSearch = ({
  name,
  value,
  placeholder = 'Search...',
  handleChange,
  handleFocus,
  additionalStyles,
}: ListSearchProps) => {
  return (
    <div css={[styles.searchWrapper, additionalStyles && additionalStyles]}>
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
