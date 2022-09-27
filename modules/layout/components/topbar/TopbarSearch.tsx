import { styles } from './TopbarSearch.styles';

export const TopbarSearch = () => {
  return (
    <div css={[styles.wrapper]}>
      <span css={[styles.icon]} className="uil uil-search" />
      <input css={[styles.input]} />
    </div>
  );
};
