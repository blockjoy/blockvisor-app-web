import { useEffect, useState } from 'react';
import { styles } from './AdminListPagination.styles';
import { SvgIcon } from '@shared/components';
import IconChevronRight from '@public/assets/icons/common/ChevronRight.svg';
import IconChevronLeft from '@public/assets/icons/common/ChevronLeft.svg';

type Props = {
  listPage: number;
  maxPagesToDisplay?: number;
  pageCount?: number;
  totalRowCount: number;
  onPageChanged: (page: number) => void;
};

export const AdminListPagination = ({
  listPage,
  pageCount = 10,
  onPageChanged,
}: Props) => {
  const allPages = Array.from({ length: pageCount }, (v, k) => k + 1);

  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(5);

  const buildPagination = (pageIndex: number) => {
    let pageStart = 0,
      pageEnd = Math.min(5, pageCount);

    if (pageIndex > 4 && pageIndex < pageCount - 3) {
      pageStart = pageIndex - 2;
      pageEnd = pageIndex - 2 + 3;
    }

    if (pageCount > 6 && pageIndex > pageCount - 4) {
      pageStart = pageCount - 5;
      pageEnd = pageCount - 1;
    }

    setStart(pageStart);
    setEnd(pageEnd);
  };

  useEffect(() => {
    buildPagination(listPage);
  }, [pageCount, listPage]);

  if (pageCount === 1) return null;

  return (
    <div css={styles.pagination}>
      <button
        type="button"
        css={styles.paginationButton}
        onClick={() => onPageChanged(listPage - 1)}
        disabled={listPage === 1}
      >
        <SvgIcon size="10px" isDefaultColor>
          <IconChevronLeft />
        </SvgIcon>
      </button>
      {(listPage >= 5 || listPage > pageCount - 5) && pageCount > 6 && (
        <button
          onClick={() => onPageChanged(1)}
          type="button"
          css={styles.paginationButton}
        >
          1
        </button>
      )}
      {(listPage >= 5 || listPage > pageCount - 5) && pageCount > 6 && (
        <span css={styles.paginationButton}>...</span>
      )}
      {allPages.slice(start, end)?.map((page: number) => (
        <button
          css={styles.paginationButton}
          className={listPage === page ? 'active' : ''}
          onClick={() => onPageChanged(page)}
          key={page}
          type="button"
        >
          {page}
        </button>
      ))}
      {listPage < pageCount - 3 && pageCount > 6 && (
        <span css={styles.paginationButton}>...</span>
      )}
      {pageCount > 5 && (
        <button
          className={listPage === pageCount ? 'active' : ''}
          onClick={() => onPageChanged(pageCount)}
          type="button"
          css={styles.paginationButton}
        >
          {pageCount}
        </button>
      )}
      <button
        type="button"
        css={styles.paginationButton}
        onClick={() => onPageChanged(listPage + 1)}
        disabled={listPage === pageCount}
      >
        <SvgIcon size="10px" isDefaultColor>
          <IconChevronRight />
        </SvgIcon>
      </button>
    </div>
  );
};
