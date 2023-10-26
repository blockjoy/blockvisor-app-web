import { useEffect, useState } from 'react';
import { styles } from './AdminListPagination.styles';
import IconPageFirst from '@public/assets/icons/common/PageFirst.svg';
import IconPageLast from '@public/assets/icons/common/PageLast.svg';
import { SvgIcon } from '@shared/components';

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

    if (pageIndex > 0 && pageIndex > (pagesToDisplay - 1) / 2) {
      start = pageIndex - (pagesToDisplay - 1) / 2;
      end = start + Math.min(pagesToDisplay, pageCount);
    }

    if (pageIndex > 0 && pageIndex > pageCount - (pagesToDisplay + 1) / 2) {
      start = pageCount - pagesToDisplay;
      end = pageCount;
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

  return (
    <footer css={styles.footer}>
      <div css={styles.pagination}>
        <button
          disabled={listPage === 0}
          onClick={() => onPageChanged(0)}
          type="button"
          css={styles.paginationButton}
        >
          <SvgIcon isDefaultColor>
            <IconPageFirst />
          </SvgIcon>
        </button>
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
        <button
          disabled={listPage === pageCount - 1}
          onClick={() => onPageChanged(pageCount - 1)}
          type="button"
          css={styles.paginationButton}
        >
          <SvgIcon isDefaultColor>
            <IconPageLast />
          </SvgIcon>
        </button>
      </div>
      <p css={styles.rowCount}>
        Showing <var css={styles.rowCountTotal}>{totalRowCount}</var> row
        {totalRowCount === 1 ? '' : 's'}
      </p>
    </footer>
  );
};
