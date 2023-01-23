import { FC, useEffect, useState } from 'react';

import { styles } from './Pagination.styles';

import IconPageFirst from '@public/assets/icons/page-first.svg';
import IconPageLast from '@public/assets/icons/page-last.svg';

type Props = {
  pagesToDisplay?: number;
  pageTotal?: number;
  onPageClicked: (pageIndex: number) => void;
};

export const Pagination: FC<Props> = ({
  pagesToDisplay = 5,
  pageTotal = 10,
  onPageClicked,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>();

  const buildPagination = (pageIndex: number) => {
    onPageClicked(pageIndex);
    setActivePage(pageIndex);
    let newPages = [];
    let start = 0;
    let end = pagesToDisplay;

    if (pageIndex > (pagesToDisplay - 1) / 2) {
      start = pageIndex - (pagesToDisplay - 1) / 2;
      end = start + pagesToDisplay;
    }

    if (pageIndex > pageTotal - (pagesToDisplay + 1) / 2) {
      start = pageTotal - pagesToDisplay;
      end = pageTotal;
    }

    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  const handlePageClicked = (pageIndex: number) => {
    onPageClicked(pageIndex);
    buildPagination(pageIndex);
  };

  useEffect(() => {
    buildPagination(0);
  }, []);

  return (
    <div css={styles.pagination}>
      <button
        disabled={activePage === 0}
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
          css={[styles.item, page === activePage && styles.active]}
          className={page === activePage ? 'active' : ''}
          onClick={() => handlePageClicked(page)}
          key={page}
          type="button"
        >
          {page + 1}
        </button>
      ))}
      <button
        css={styles.item}
        disabled={activePage === pageTotal - 1}
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
