import { useState } from 'react';
import { isSafari } from 'react-device-detect';
import { styles } from './table.styles';
import { BaseQueryParams } from '@shared/common/common';
import { TableRowLoader } from './TableRowLoader';
import { TableHeader } from './TableHeader/TableHeader';
import { TableCell } from './TableCell/TableCell';

export const Table = <T extends BaseQueryParams>({
  hideHeader,
  headers = [],
  rows = [],
  onRowClick,
  isLoading,
  preload,
  verticalAlign,
  fixedRowHeight,
  queryParams,
  handleSort,
  additionalStyles,
  isHover = true,
  isDraggable,
  isResizable,
  drag,
  resize,
  context,
  columns,
  tableRef,
  wrapperRef,
  handleHeaderRef,
}: TableProps<T>) => {
  const [activeRowKey, setActiveRowKey] = useState(
    rows?.[0]?.isClickable ? rows?.[0]?.key : '',
  );

  const handleRowClick = (id: string) => {
    if (onRowClick) {
      onRowClick(id);
    }
    setActiveRowKey(id);
  };

  const tableColumns = columns ?? headers;

  return (
    <div
      css={styles.wrapper(isResizable)}
      className="table-wrapper"
      {...(wrapperRef && { ref: wrapperRef })}
    >
      <table
        {...(tableRef && { ref: tableRef })}
        css={[
          styles.table(isResizable),
          fixedRowHeight && styles.fixedRowHeight(fixedRowHeight),
          additionalStyles && additionalStyles,
          isHover && styles.tableHoverIcon,
        ]}
      >
        {!hideHeader && headers && rows?.length > 0 && (
          <thead>
            <tr>
              {tableColumns.map((col, colIndex) => {
                const { key, name, label, hideLabel } = col;

                return (
                  <TableHeader
                    key={key}
                    {...(handleHeaderRef && {
                      ref: (el) => handleHeaderRef(el, colIndex),
                    })}
                    header={col}
                    index={colIndex}
                    context={context}
                    sort={queryParams?.sort?.[0]}
                    handleSort={handleSort}
                    {...(isResizable && {
                      resize,
                    })}
                    {...(isDraggable && {
                      drag,
                    })}
                  >
                    {(!hideLabel && label) || name}
                  </TableHeader>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {isLoading === 'initializing' ? (
            <TableRowLoader length={preload} />
          ) : (
            rows?.map((tr) => {
              return (
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
                  {tableColumns?.map((col, colIndex) => {
                    const cell = tr.cells?.find(
                      (singleRow) => singleRow.key === col.key,
                    );

                    return (
                      <TableCell
                        key={col.key}
                        cell={col}
                        index={colIndex}
                        verticalAlign={verticalAlign}
                        {...(isResizable && {
                          resize,
                        })}
                        {...(rows.length <= 10 &&
                          isDraggable && {
                            drag,
                          })}
                      >
                        {cell?.component}
                      </TableCell>
                    );
                  })}
                </tr>
              );
            })
          )}
          {isLoading === 'loading' && preload ? (
            <TableRowLoader length={preload} />
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
