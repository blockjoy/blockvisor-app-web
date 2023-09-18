import { styles } from './table.styles';
import { css, SerializedStyles } from '@emotion/react';
import TableRowLoader from './TableRowLoader';
import { isSafari } from 'react-device-detect';
import { TableSortButton } from './TableSortButton';
import { useState } from 'react';

export type TableProps = {
  hideHeader?: boolean;
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (id: string) => void;
  isLoading: LoadingState;
  preload?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
  properties?: InitialFilter;
  handleSort?: (dataField: string) => void;
  additionalStyles?: SerializedStyles[];
};

export const Table = ({
  hideHeader,
  headers = [],
  rows = [],
  onRowClick,
  isLoading,
  preload,
  verticalAlign,
  fixedRowHeight,
  properties,
  handleSort,
  additionalStyles,
}: TableProps) => {
  const [activeRowKey, setActiveRowKey] = useState<string>(rows?.[0].key);

  const handleRowClick = (id: string) => {
    if (onRowClick) {
      onRowClick(id);
      setActiveRowKey(id);
    }
  };

  return (
    <div css={styles.wrapper}>
      <table
        css={[
          styles.table,
          fixedRowHeight && styles.fixedRowHeight(fixedRowHeight),
          additionalStyles && additionalStyles,
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
            <TableRowLoader length={preload} />
          ) : (
            rows?.map((tr) => (
              <tr
                key={tr.key}
                className={`${tr.isDanger ? 'danger' : ''} ${
                  tr.key === activeRowKey ? 'active' : ''
                }`}
                css={[
                  !onRowClick || tr.isClickable === false
                    ? null
                    : !isSafari
                    ? styles.rowFancyUnderlineHover
                    : styles.rowBasicUnderlineHover,
                ]}
                onClick={
                  tr.isClickable !== false
                    ? () => handleRowClick(tr.key)
                    : undefined
                }
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
