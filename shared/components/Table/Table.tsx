import { styles } from './table.styles';
import { css } from '@emotion/react';
import TableRowLoader from './TableRowLoader';
import { useEffect, useState } from 'react';
import { Pagination } from '@shared/components';
import { SetterOrUpdater } from 'recoil';
import { isSafari } from 'react-device-detect';

type Props = {
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  onPageClicked?: (pageIndex: number) => void;
  isLoading: LoadingState;
  preload?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
  pageSize?: number;
  pageIndex?: number;
  setPageIndex?: SetterOrUpdater<number>;
};

export const Table: React.FC<Props> = ({
  headers = [],
  rows = [],
  onRowClick,
  onPageClicked,
  isLoading,
  preload,
  verticalAlign,
  fixedRowHeight,
  pageSize,
  pageIndex,
  setPageIndex,
}) => {
  const [activeRows, setActiveRows] = useState<Row[]>(rows);

  const pageTotal =
    rows?.length < pageSize! ? 1 : Math.ceil(rows?.length / pageSize!);

  const handlePageClicked = (index: number) => {
    if (onPageClicked) {
      onPageClicked(index);
    }
  };

  const handleRowClick = (tr: any) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  const getPageOfRows = () => {
    const start = pageIndex === 0 ? 0 : pageIndex! * pageSize!;
    const end = pageIndex === 0 ? pageSize : pageIndex! * pageSize! + pageSize!;
    const newRows = rows.slice(start, end);
    return newRows;
  };

  useEffect(() => {
    if (pageSize) {
      setActiveRows(getPageOfRows());
    }
  }, [pageIndex]);

  useEffect(() => {
    if (pageSize) {
      if (rows?.length) {
        setActiveRows(getPageOfRows());
      }
      if (pageIndex! > pageTotal - 1 && setPageIndex) {
        setPageIndex(pageTotal - 1);
      }
    }
  }, [rows?.length]);

  return (
    <div css={styles.wrapper}>
      <table
        css={[
          styles.table,
          !!onRowClick && styles.hasHoverRows,
          fixedRowHeight && styles.fixedRowHeight(fixedRowHeight),
        ]}
      >
        {headers && rows?.length > 0 && (
          <thead>
            <tr>
              {headers.map(
                ({
                  isHiddenOnMobile,
                  key,
                  width,
                  minWidth,
                  maxWidth,
                  textAlign,
                  name,
                  component,
                }) => (
                  <th
                    className={isHiddenOnMobile ? 'hidden-on-mobile' : ''}
                    key={key}
                    css={css`
                      width: ${width};
                      min-width: ${minWidth};
                      max-width: ${maxWidth};
                      text-align: ${textAlign || 'left'};
                    `}
                  >
                    {component || name}
                  </th>
                ),
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {isLoading === 'initializing' ? (
            <TableRowLoader length={preload} />
          ) : (
            activeRows?.map((tr) => (
              <tr
                key={tr.key}
                className={tr.isDanger ? 'danger' : ''}
                css={[
                  !isSafari
                    ? styles.rowFancyUnderlineHover
                    : styles.rowBasicUnderlineHover,
                ]}
                onClick={() => handleRowClick(tr)}
              >
                {tr.cells?.map((td, index) => (
                  <td
                    key={td.key}
                    css={[
                      headers &&
                        headers[index]?.isHiddenOnMobile &&
                        styles.hiddenOnMobile,
                      verticalAlign ? styles[verticalAlign] : styles.middle,
                      styles.textAlign(headers[index].textAlign || 'left'),
                    ]}
                  >
                    {td.component}
                    {index === 0 && !isSafari && (
                      <span className="underline" css={styles.underline} />
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
          {isLoading === 'loading' && preload ? (
            <TableRowLoader length={preload} />
          ) : null}
        </tbody>
      </table>
      {Boolean(pageSize) && isLoading === 'finished' && pageTotal > 1 && (
        <Pagination
          onPageClicked={handlePageClicked}
          pagesToDisplay={pageTotal < 5 ? pageTotal : 5}
          pageTotal={pageTotal}
          pageIndex={pageIndex!}
          itemTotal={rows?.length}
        />
      )}
    </div>
  );
};
