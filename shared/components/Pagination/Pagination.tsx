import { FC, useEffect, useState } from 'react';

import { styles } from './Pagination.styles';

import IconPageFirst from '@public/assets/icons/page-first.svg';
import IconPageLast from '@public/assets/icons/page-last.svg';

type Props = {
  pagesToDisplay?: number;
  pageTotal?: number;
  onPageClicked: (pageIndex: number) => void;
  pageIndex: number;
  itemTotal: number;
};

export const Pagination: FC<Props> = ({
  pagesToDisplay = 5,
  pageTotal = 10,
  onPageClicked,
  pageIndex,
  itemTotal,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  const buildPagination = (index: number) => {
    let newPages = [];
    let start = 0;
    let end = pagesToDisplay;

    if (index > (pagesToDisplay - 1) / 2) {
      start = index - (pagesToDisplay - 1) / 2;
      end = start + pagesToDisplay;
    }

    if (index > pageTotal - (pagesToDisplay + 1) / 2) {
      start = pageTotal - pagesToDisplay;
      end = pageTotal;
    }

    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
    onPageClicked(index);
  };

  const handlePageClicked = (index: number) => {
    buildPagination(index);
    onPageClicked(index);
  };

  useEffect(() => {
    if (itemTotal) {
      buildPagination(pageIndex);
    }
  }, [itemTotal]);

  return (
    <div css={styles.pagination}>
      <button
        disabled={pageIndex === 0}
        onClick={() => handlePageClicked(0)}
        type="button"
        css={styles.item}
      >
        <span css={styles.icon}>
          <IconPageFirst />
        </span>
      </button>
      {pages.map((page: number) => (
        <button
          css={[styles.item, page === pageIndex && styles.active]}
          className={page === pageIndex ? 'active' : ''}
          onClick={() => handlePageClicked(page)}
          key={page}
          type="button"
        >
          {page + 1}
        </button>
      ))}
      <button
        css={styles.item}
        disabled={pageIndex === pageTotal - 1}
        onClick={() => handlePageClicked(pageTotal - 1)}
        type="button"
      >
        <span css={styles.icon}>
          <IconPageLast />
        </span>
      </button>
    </div>
  );
};
