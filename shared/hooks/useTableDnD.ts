import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import throttle from 'lodash/throttle';
import { getUpdatedHeaders } from '@shared/index';

export const useTableDnD = (
  headers: TableHeader[] = [],
  columns: TableHeader[] = [],
  setColumns?: React.Dispatch<React.SetStateAction<TableHeader[]>>,
  handleUpdateColumns?: (columns: TableColumn[]) => void,
  headersRef?: React.MutableRefObject<(HTMLTableCellElement | null)[]>,
  wrapperRef?: React.RefObject<HTMLDivElement | null>,
  tableRef?: React.RefObject<HTMLDivElement | null>,
) => {
  const [deltaX, setDeltaX] = useState<number | null>(null);

  const dragStartX = useRef<number>(0);
  const initialScrollOffset = useRef<number>(0);
  const lastDragX = useRef<number>(0);

  const draggingIndex = useRef<number | null>(null);
  const targetIndex = useRef<number | null>(null);

  const itemShiftsX = useRef<number[]>([]);

  const movingDirection = useRef<'left' | 'right' | 'none'>('none');

  const scrollAnimationFrame = useRef<number | null>(null);

  const maxDeltaXLeft = useRef<number | null>(null);
  const maxDeltaXRight = useRef<number | null>(null);

  const wrapperRect = wrapperRef?.current?.getBoundingClientRect();

  const startAutoScroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollAnimationFrame.current) return;

      const scroll = () => {
        if (wrapperRef?.current) {
          const scrollOffset = direction === 'left' ? -5 : 5;
          wrapperRef.current.scrollLeft += scrollOffset;
          scrollAnimationFrame.current = requestAnimationFrame(scroll);
        }
      };
      scrollAnimationFrame.current = requestAnimationFrame(scroll);
    },
    [wrapperRef],
  );

  const stopAutoScroll = useCallback(() => {
    if (scrollAnimationFrame.current) {
      cancelAnimationFrame(scrollAnimationFrame.current);
      scrollAnimationFrame.current = null;
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>, index: number) => {
      draggingIndex.current = index;
      targetIndex.current = index;

      dragStartX.current = e.clientX;
      initialScrollOffset.current = wrapperRef?.current?.scrollLeft || 0;

      itemShiftsX.current = new Array(columns.length).fill(0);

      const draggingHeader = headersRef?.current[index];
      const draggingRect = draggingHeader?.getBoundingClientRect();

      maxDeltaXRight.current =
        tableRef?.current?.clientWidth! +
        wrapperRect?.left! -
        (wrapperRef?.current?.scrollLeft! + draggingRect?.right!)!;

      maxDeltaXLeft.current =
        wrapperRect?.left! -
        (wrapperRef?.current?.scrollLeft! + draggingRect?.left!)!;

      document.addEventListener('mousemove', throttledHandleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [columns, wrapperRef],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex.current === null) return;

      const draggingHeader = headersRef?.current[draggingIndex.current];
      if (!draggingHeader) return;

      const draggingRect = draggingHeader.getBoundingClientRect();

      const currentScrollOffset = wrapperRef?.current?.scrollLeft || 0;
      const scrollDelta = currentScrollOffset - initialScrollOffset.current;

      const dragDeltaX = e.clientX - dragStartX.current + scrollDelta;
      setDeltaX(dragDeltaX);

      if (lastDragX.current !== e.clientX && dragDeltaX !== 0) {
        movingDirection.current =
          lastDragX.current > e.clientX ? 'left' : 'right';
      } else if (dragDeltaX === 0) {
        movingDirection.current = 'none';
      }

      lastDragX.current = e.clientX;

      let index = 0;
      for (const header of headersRef.current) {
        if (!header || index === draggingIndex.current) {
          index++;
          continue;
        }

        const rect = header.getBoundingClientRect();
        const midpoint = rect?.left + rect.width / 2;

        if (
          movingDirection.current === 'left' &&
          draggingRect.left < midpoint
        ) {
          if (index < targetIndex.current!) {
            targetIndex.current = index;
            break;
          } else if (
            draggingIndex.current < index &&
            draggingIndex.current! < targetIndex.current!
          ) {
            targetIndex.current = index - 1;
            break;
          }
        }

        if (
          movingDirection.current === 'right' &&
          draggingRect.right > midpoint
        ) {
          if (index > targetIndex.current!) {
            targetIndex.current = index;
            break;
          } else if (
            targetIndex.current! <= index &&
            draggingIndex.current! > targetIndex.current!
          ) {
            targetIndex.current = index + 1;
            break;
          }
        }

        index++;
      }

      itemShiftsX.current = columns.map((_, j) => {
        if (j < draggingIndex.current!) {
          if (targetIndex.current !== null && j >= targetIndex.current) {
            return draggingRect.width!;
          } else {
            return 0;
          }
        } else if (j > draggingIndex.current!) {
          if (targetIndex.current !== null && j <= targetIndex.current) {
            return -1 * draggingRect.width!;
          } else {
            return 0;
          }
        } else {
          if (dragDeltaX > maxDeltaXRight.current!) {
            return maxDeltaXRight.current!;
          } else if (maxDeltaXLeft.current! > dragDeltaX!) {
            return maxDeltaXLeft.current!;
          } else {
            return dragDeltaX;
          }
        }
      });

      if (wrapperRef?.current) {
        if (draggingRect.left - 50 < wrapperRect?.left!) {
          startAutoScroll('left');
        } else if (draggingRect.right + 50 > wrapperRect?.right!) {
          startAutoScroll('right');
        } else {
          stopAutoScroll();
        }
      }
    },
    [columns, headersRef, wrapperRef, deltaX],
  );

  const throttledHandleMouseMove = useMemo(
    () => throttle(handleMouseMove, 16 /* 60fps */),
    [handleMouseMove],
  );

  const handleMouseUp = useCallback(() => {
    setDeltaX(null);

    stopAutoScroll();

    document.removeEventListener('mousemove', throttledHandleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    if (
      draggingIndex.current !== null &&
      targetIndex.current !== null &&
      draggingIndex.current !== targetIndex.current
    ) {
      const updatedColumns = [...(columns ?? [])];
      const [movedColumn] = updatedColumns.splice(draggingIndex.current, 1);

      updatedColumns.splice(targetIndex.current, 0, movedColumn);
      setColumns?.(updatedColumns);

      if (movedColumn) {
        const sortedColumns = getUpdatedHeaders(
          headers,
          columns,
          draggingIndex.current,
          targetIndex.current,
        );

        handleUpdateColumns?.(sortedColumns);
      }
    }

    movingDirection.current = 'none';
    draggingIndex.current = null;
    targetIndex.current = null;
    itemShiftsX.current = [];
  }, [columns, throttledHandleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', throttledHandleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return {
    deltaX,
    draggingIndex: draggingIndex.current,
    targetIndex: targetIndex.current,
    itemShiftsX: itemShiftsX.current,
    handleMouseDown,
  };
};
