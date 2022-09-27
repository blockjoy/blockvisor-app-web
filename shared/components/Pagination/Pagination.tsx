import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { styles } from './Pagination.styles';
import { PaginationItem } from './PaginationItem';

interface Props {
  numberOfItems: number;
  itemsPerPage: number;
}

export const Pagination: FC<Props> = ({
  numberOfItems = 0,
  itemsPerPage = 1,
}) => {
  const { query, replace } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [pagesToRender, setPagesToRender] = useState<number[]>();

  useEffect(() => {
    setTotalPages(Math.ceil(numberOfItems / itemsPerPage));
  }, [numberOfItems, itemsPerPage]);

  useEffect(() => {
    if (query.page && typeof query.page === 'string') {
      setCurrentPage(parseInt(query.page));
    }
  }, [query.page]);

  useEffect(() => {
    if (!query.page) {
      replace({
        query: { ...query, page: 1 },
      });
    }
  }, [query.page]);

  /** A bit ugly, but straightforward for this case. */
  useEffect(() => {
    if (currentPage === 1) {
      return setPagesToRender([
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
        currentPage + 4,
      ]);
    }

    if (currentPage === 2) {
      return setPagesToRender([
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
      ]);
    }

    if (totalPages && currentPage === totalPages - 1) {
      return setPagesToRender([
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ]);
    }

    if (totalPages && currentPage === totalPages) {
      return setPagesToRender([
        currentPage - 4,
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
      ]);
    }

    setPagesToRender([
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ]);
  }, [currentPage]);

  function renderPages() {
    return pagesToRender?.map((item) => {
      return (
        <PaginationItem
          type="page"
          active={item === currentPage}
          number={item}
        />
      );
    });
  }

  if (!query.page) {
    return null;
  }

  return (
    <div css={styles.base}>
      <PaginationItem
        type="first"
        disabled={currentPage === 1}
        totalPages={totalPages}
      />
      {renderPages()}
      <PaginationItem
        type="last"
        disabled={currentPage === totalPages}
        totalPages={totalPages}
      />
    </div>
  );
};
