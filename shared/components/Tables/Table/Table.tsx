import { styles } from './table.styles';
import { css } from '@emotion/react';
import TableRowLoader from './TableRowLoader';
import { isSafari } from 'react-device-detect';
import { TableSortButton } from './TableSortButton';

export type TableProps = {
  hideHeader?: boolean;
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (arg0: Row) => void;
  isLoading: LoadingState;
  preload?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
  properties?: InitialFilter;
  handleSort?: (dataField: string) => void;
  dataCy?: string;
  loadingDataCy?: string;
};

export const Table = ({
  hideHeader,
  headers = [],
  rows = [],
  dataCy,
  onRowClick,
  isLoading,
  preload,
  verticalAlign,
  fixedRowHeight,
  properties,
  loadingDataCy,
  handleSort,
}: TableProps) => {
  const handleRowClick = (tr: Row) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  return (
    <div css={styles.wrapper}>
      <table
        data-cy={dataCy}
        css={[
          styles.table,
          !!onRowClick && styles.hasHoverRows,
          fixedRowHeight && styles.fixedRowHeight(fixedRowHeight),
        ]}
      >
        {!hideHeader && headers && rows?.length > 0 && (
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
                  sort,
                  dataField,
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
                    {sort && handleSort && dataField ? (
                      <TableSortButton
                        onClick={() => handleSort(dataField)}
                        sortExpression={dataField}
                        activeSortExpression={properties?.sorting?.field}
                        activeOrder={properties?.sorting?.order}
                      >
                        {component || name}
                      </TableSortButton>
                    ) : (
                      component || name
                    )}
                  </th>
                ),
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {isLoading === 'initializing' ? (
            <TableRowLoader dataCy={loadingDataCy} length={preload} />
          ) : (
            rows?.map((tr) => (
              <tr
                key={tr.key}
                className={tr.isDanger ? 'danger' : ''}
                css={[
                  !!!onRowClick
                    ? null
                    : !isSafari
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
                      styles.textAlign(headers[index]?.textAlign || 'left'),
                      css`
                        width: ${headers[index]?.width};
                        min-width: ${headers[index]?.minWidth};
                        max-width: ${headers[index]?.maxWidth};
                      `,
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
    </div>
  );
};
