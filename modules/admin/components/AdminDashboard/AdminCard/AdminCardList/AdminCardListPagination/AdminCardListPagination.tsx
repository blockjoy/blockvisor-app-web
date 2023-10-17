import { useEffect, useState } from 'react';

import { styles } from './AdminCardListPagination.styles';

type Props = {
  listPage: number;
  pagesToDisplay?: number;
  pageCount?: number;
  onPageChanged: (page: number) => void;
};

export const AdminCardListPagination = ({
  listPage,
  pagesToDisplay = 5,
  pageCount = 10,
  onPageChanged,
}: Props) => {
  const [pages, setPages] = useState<number[]>([]);

  const buildPagination = (pageIndex: number) => {
    let newPages = [];

    let start = 0;
    let end = Math.min(pagesToDisplay, pageCount);

    if (pageIndex > 0 && pageIndex > (pagesToDisplay - 1) / 2) {
      start = pageIndex - (pagesToDisplay - 1) / 2;
      end = start + pagesToDisplay;
    }

    if (pageIndex > 0 && pageIndex > pageCount - (pagesToDisplay + 1) / 2) {
      start = pageCount - pagesToDisplay;
      end = pageCount;
    }

    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  useEffect(() => {
    buildPagination(listPage);
  }, [pageCount, listPage]);

  return (
    <div css={styles.pagination}>
      <button
        disabled={listPage === 0}
        onClick={() => onPageChanged(0)}
        type="button"
        css={styles.paginationButton}
      >
        {'|<'}
      </button>
      {pages.map((page: number) => (
        <button
          css={styles.paginationButton}
          className={listPage === page ? 'active' : ''}
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
        {'>|'}
      </button>
    </div>
  );
};
