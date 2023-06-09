import { styles } from './Pagination.styles';
import IconPageFirst from '@public/assets/icons/common/PageFirst.svg';
import IconPageLast from '@public/assets/icons/common/PageLast.svg';

type PaginationProps = {
  onPageClicked: (index: number) => void;
  totalPages: number;
  currentPage: number;
};

export const Pagination = ({
  onPageClicked,
  totalPages,
  currentPage,
}: PaginationProps) => {
  const pagesToDisplay = totalPages > 5 ? 5 : totalPages;

  let allPages = [];
  for (let i = 1; i <= pagesToDisplay; i++) {
    allPages.push(i);
  }

  const handlePageClicked = (index: number) => {
    onPageClicked(index);
  };

  return (
    <div css={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClicked(1)}
        type="button"
        css={styles.item}
      >
        <span css={styles.icon}>
          <IconPageFirst />
        </span>
      </button>
      {allPages.map((page: number) => (
        <button
          css={[styles.item, page === currentPage && styles.active]}
          className={page === currentPage ? 'active' : ''}
          onClick={() => handlePageClicked(page)}
          key={page}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        css={styles.item}
        disabled={currentPage === pagesToDisplay}
        onClick={() => handlePageClicked(pagesToDisplay)}
        type="button"
      >
        <span css={styles.icon}>
          <IconPageLast />
        </span>
      </button>
    </div>
  );
};
