import { useEffect, useRef, useState } from 'react';
import { css, Global } from '@emotion/react';
import { useTableDnD, useTableResize } from '@shared/index';
import { Table } from '@shared/components';
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
  const [context, setContext] = useState<string | null>(null);

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
    headersRef,
    columns,
    setColumns,
    handleUpdateColumns,
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

  const handleContext = (key: string | null) => {
    setContext(key);
  };

  return (
    <>
      {draggingIndex || resizeIndex ? (
        <Global
          styles={css`
            body * {
              user-select: none;
            }
          `}
        />
      ) : null}
      <Table
        tableRef={tableRef}
        wrapperRef={wrapperRef}
        columns={columns}
        handleHeaderRef={handleHeaderRef}
        resize={{
          isResizable: isResizable && !context,
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
        }}
        additionalStyles={[
          ...(additionalStyles ?? []),
          styles.tableDynamic,
          context && styles.tableBackdrop,
        ]}
        {...props}
      />
    </>
  );
};
