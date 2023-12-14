import { useEffect, useRef, useState } from 'react';
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
  const allPages = Array.from({ length: pageCount }, (v, k) => k);

  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(5);

  const buildPagination = (pageIndex: number) => {
    const pagesToDisplay = Math.min(5, pageCount);

    let pageStart = 0,
      pageEnd = pagesToDisplay;

    if (pageIndex > 3 && pageIndex < pageCount - 3) {
      pageStart = pageIndex - 1;
      pageEnd = pageIndex - 1 + 3;
    }

    if (pageCount > 5 && pageIndex > pageCount - 5) {
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
    <footer css={styles.footer}>
      <div css={styles.pagination}>
        <button
          type="button"
          css={styles.paginationButton}
          onClick={() => onPageChanged(listPage - 1)}
          disabled={listPage === 0}
        >
          <SvgIcon size="10px" isDefaultColor>
            <IconChevronLeft />
          </SvgIcon>
        </button>
        {listPage >= 4 && pageCount > 5 && (
          <button
            onClick={() => onPageChanged(0)}
            type="button"
            css={styles.paginationButton}
          >
            1
          </button>
        )}
        {listPage >= 4 && pageCount > 5 && (
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
            {page + 1}
          </button>
        ))}
        {listPage < pageCount - 4 && pageCount > 5 && (
          <span css={styles.paginationButton}>...</span>
        )}
        {pageCount > 5 && (
          <button
            className={listPage === pageCount - 1 ? 'active' : ''}
            onClick={() => onPageChanged(pageCount - 1)}
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
          disabled={listPage === pageCount - 1}
        >
          <SvgIcon size="10px" isDefaultColor>
            <IconChevronRight />
          </SvgIcon>
        </button>
      </div>
    </footer>
  );
};
