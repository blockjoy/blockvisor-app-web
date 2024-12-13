import { useEffect, useRef, useState } from 'react';
import { css, Global } from '@emotion/react';
import { useTableContext, useTableDnD, useTableResize } from '@shared/index';
import { Table } from '@shared/components';
import { TableScroller } from './TableScroller/TableScroller';
import { BaseQueryParams } from '@shared/common/common';
import { styles } from './table.styles';

export const TableDynamic = <T extends BaseQueryParams>({
  ...props
}: TableProps<T>) => {
  const {
    headers,
    isResizable,
    isDraggable,
    additionalStyles,
    handleUpdateColumns,
    contextItems,
  } = props;

  const tableRef = useRef<HTMLTableElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const headersRef = useRef<(HTMLTableCellElement | null)[]>([]);

  const [columns, setColumns] = useState<TableHeader[]>([]);

  useEffect(() => {
    const filteredHeaders =
      headers?.filter((header) => header.isVisible ?? true) ?? [];

    setColumns(filteredHeaders);
  }, [headers]);

  const {
    deltaX,
    draggingIndex,
    targetIndex,
    itemShiftsX,
    handleMouseDown: handleReorder,
  } = useTableDnD(
    headers,
    columns,
    setColumns,
    handleUpdateColumns,
    headersRef,
    wrapperRef,
    tableRef,
  );

  const {
    isResizing,
    resizeIndex,
    handleMouseDown: handleResize,
  } = useTableResize(headersRef, columns, setColumns, handleUpdateColumns);

  const handleHeaderRef = (
    el: HTMLTableCellElement | null,
    colIndex: number,
  ) => {
    headersRef.current[colIndex] = el;
  };

  const {
    context,
    position,
    handleMouseDown: handleContext,
  } = useTableContext(headersRef, wrapperRef);

  return (
    <>
      {draggingIndex || resizeIndex || context ? (
        <Global
          styles={css`
            ${(draggingIndex || resizeIndex) &&
            `body * {
              user-select: none;
            }`}
            ${context &&
            `.table-wrapper {
              overflow: hidden !important;
            }`}
          `}
        />
      ) : null}
      <Table
        tableRef={tableRef}
        wrapperRef={wrapperRef}
        columns={columns}
        handleHeaderRef={handleHeaderRef}
        resize={{
          isResizable: isResizable,
          isResizing,
          resizeIndex,
          onResize: handleResize,
        }}
        drag={{
          isDraggable: isDraggable && !context,
          draggingIndex,
          targetIndex,
          deltaX,
          itemShiftsX,
          onDrag: handleReorder,
        }}
        context={{
          key: context,
          onClick: handleContext,
          items: contextItems,
          position,
        }}
        additionalStyles={[
          ...(additionalStyles ?? []),
          styles.tableDynamic,
          context && styles.tableBackdrop,
        ]}
        {...props}
      />
      <TableScroller wrapperRef={wrapperRef} tableRef={tableRef} />
    </>
  );
};
