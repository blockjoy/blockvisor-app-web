import { tableStyles } from './table.styles';
import { css } from '@emotion/react';
import TableRowLoader from './TableRowLoader';
import { useEffect, useState } from 'react';
import { Pagination } from '@shared/components';

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
    if (rows?.length && pageSize && (pageIndex === 0 || !activeRows.length)) {
      setActiveRows(rows.slice(pageIndex, pageSize));
    }
  }, [rows?.length]);

  return (
    <div css={tableStyles.wrapper}>
      <table
        css={[
          tableStyles.table,
          !!onRowClick && tableStyles.hasHoverRows,
          fixedRowHeight && tableStyles.fixedRowHeight(fixedRowHeight),
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
                onClick={() => handleRowClick(tr)}
              >
                {tr.cells?.map((td, index) => (
                  <td
                    key={td.key}
                    css={[
                      headers &&
                        headers[index]?.isHiddenOnMobile &&
                        tableStyles.hiddenOnMobile,
                      verticalAlign
                        ? tableStyles[verticalAlign]
                        : tableStyles.middle,

                      tableStyles.textAlign(headers[index].textAlign || 'left'),
                    ]}
                  >
                    {td.component}
                    {index === 0 && (
                      <span className="underline" css={tableStyles.underline} />
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
