import { useEffect, useState } from 'react';
import { styles } from './AdminListPagination.styles';
import IconArrowRight from '@public/assets/icons/common/ArrowRight.svg';
import IconArrowLeft from '@public/assets/icons/common/ArrowLeft.svg';
import { SvgIcon } from '@shared/components';
import { pageSize } from '@modules/admin/constants/constants';

type Props = {
  listPage: number;
  maxPagesToDisplay?: number;
  pageCount?: number;
  totalRowCount: number;
  onPageChanged: (page: number) => void;
};

export const AdminListPagination = ({
  listPage,
  maxPagesToDisplay = 5,
  pageCount = 10,
  totalRowCount,
  onPageChanged,
}: Props) => {
  const [pages, setPages] = useState<number[]>([]);
  const [isBuilding, setIsBuilding] = useState(true);

  const buildPagination = (pageIndex: number) => {
    setPages([]);

    const pagesToDisplay = Math.min(maxPagesToDisplay, pageCount);

    let newPages = [];

    let start = 0;
    let end = pagesToDisplay;

    if (pageIndex > 3 && pageIndex < pageCount - 3) {
      start = pageIndex - 1;
      end = pageIndex - 1 + 3;
    }

    if (pageCount > 5 && pageIndex > pageCount - 5) {
      start = pageCount - 5;
      end = pageCount - 1;
    }

    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
    setIsBuilding(false);
  };

  useEffect(() => {
    setIsBuilding(true);
    buildPagination(listPage);
  }, [pageCount, listPage]);

  if (pageCount === 1) return null;

  return (
    <footer css={styles.footer}>
      <div css={styles.pagination}>
        {listPage >= 4 && (
          <button
            onClick={() => onPageChanged(0)}
            type="button"
            css={styles.paginationButton}
          >
            1
          </button>
        )}
        {listPage >= 4 && <span css={styles.paginationButton}>...</span>}
        {pages.map((page: number) => (
          <button
            css={styles.paginationButton}
            className={listPage === page && !isBuilding ? 'active' : ''}
            onClick={() => onPageChanged(page)}
            key={page}
            type="button"
          >
            {page + 1}
          </button>
        ))}
        {listPage < pageCount - 4 && (
          <span css={styles.paginationButton}>...</span>
        )}
        {pageCount > 5 && (
          <button
            className={
              listPage === pageCount - 1 && !isBuilding ? 'active' : ''
            }
            onClick={() => onPageChanged(pageCount - 1)}
            type="button"
            css={styles.paginationButton}
          >
            {pageCount}
          </button>
        )}
      </div>
    </footer>
  );
};
