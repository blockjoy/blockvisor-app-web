import { tableStyles } from './table.styles';
import { css } from '@emotion/react';
import TableRowLoader from './TableRowLoader';
import { useEffect, useState } from 'react';
import { Pagination } from '@shared/components';

type Props = {
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  isLoading: LoadingState;
  preload?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
  pageSize?: number;
};

export const Table: React.FC<Props> = ({
  headers = [],
  rows = [],
  onRowClick,
  isLoading,
  preload,
  verticalAlign,
  fixedRowHeight,
  pageSize,
}) => {
  const [activeRows, setActiveRows] = useState<Row[]>(rows);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageCount =
    rows?.length < pageSize! ? 1 : Math.ceil(rows?.length / pageSize!);

  const handlePageClicked = (pageIndex: number) => {
    setPageIndex(pageIndex);
  };

  const handleRowClick = (tr: any) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  useEffect(() => {
    if (pageSize) {
      setActiveRows(
        rows.slice(
          pageIndex === 0 ? 0 : pageIndex * pageSize!,
          pageIndex === 0 ? pageSize : pageIndex * pageSize! + pageSize!,
        ),
      );
    }
  }, [pageIndex]);

  useEffect(() => {
    if (rows?.length && pageSize) {
      setActiveRows(rows.slice(pageIndex, pageSize));
    }
  }, [rows]);

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
      {Boolean(pageSize) && isLoading === 'finished' && (
        <Pagination
          onPageClicked={handlePageClicked}
          pagesToDisplay={pageCount < 5 ? pageCount : 5}
          pageCount={pageCount}
        />
      )}
    </div>
  );
};
