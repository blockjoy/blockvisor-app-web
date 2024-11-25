import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  RefObject,
} from 'react';
import { getSortedColumns } from '@shared/components';

export const useDraggableList = <T extends { key: string }, C>(
  items: T[],
  onChange: (columns: C[]) => void,
  itemRefs: RefObject<(HTMLLIElement | null)[]>,
) => {
  const [currentItems, setCurrentItems] = useState<T[]>(items);
  const [isDragging, setIsDragging] = useState(false);
  const [willEndDragging, setWillEndDragging] = useState(false);

  const itemShiftsY = useRef<number[]>([]);

  const draggingIndex = useRef<number | null>(null);
  const targetIndex = useRef<number | null>(null);

  const draggingOffsetTop = useRef<number | null>(null);
  const draggingItemSpacing = useRef<number | null>(null);
  const draggingItemHeights = useRef<number[]>([]);

  const touchId = useRef<number | null>(null);

  const shiftY = useRef<number | null>(null);

  const dragStartY = useRef<number>(0);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement> | React.TouchEvent<HTMLLIElement>,
      index: number,
    ) => {
      const item = itemRefs.current?.[index];
      const item0 = itemRefs.current?.[0];
      const item1 = itemRefs.current?.[1];

      const isTouchEvent = 'touches' in e;

      touchId.current = isTouchEvent
        ? (e as React.TouchEvent).changedTouches[0]?.identifier
        : null;

      setIsDragging(true);

      itemShiftsY.current = currentItems.map(() => 0);

      shiftY.current = 0;

      draggingIndex.current = index;
      targetIndex.current = index;

      draggingOffsetTop.current =
        item?.getBoundingClientRect().top! -
        item0?.getBoundingClientRect().top!;

      dragStartY.current = isTouchEvent
        ? (e as React.TouchEvent).touches[0].pageY
        : (e as React.MouseEvent).pageY;

      draggingItemSpacing.current =
        item1!.getBoundingClientRect().top -
        item0!.getBoundingClientRect().bottom;

      draggingItemHeights.current =
        itemRefs.current
          ?.map((node) => node?.getBoundingClientRect().height)
          .filter((height): height is number => height !== undefined) ?? [];

      if (touchId.current) {
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
      } else {
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
      }
    },
    [currentItems],
  );

  const onDragMove = useCallback(
    (event: any) => {
      let y: number | undefined;
      if (touchId.current) {
        for (const touch of event.changedTouches) {
          if (touch.identifier === touchId.current) {
            y = touch.pageY;
            break;
          }
        }
      } else {
        y = event.pageY;
      }

      if (y === undefined) {
        return;
      }

      event.preventDefault();

      const movedY = y - dragStartY.current;

      const draggedItemOffsetTop = draggingOffsetTop.current! + movedY;

      const position = getDraggedItemPosition(
        draggingItemHeights.current,
        draggingItemSpacing.current!,
        draggedItemOffsetTop,
        draggingIndex.current!,
      );

      const draggedItemHeight =
        draggingItemHeights.current[draggingIndex.current!];

      itemShiftsY.current = currentItems.map((_, j) => {
        if (j < draggingIndex.current!) {
          if (j >= position) {
            return draggedItemHeight + draggingItemSpacing.current!;
          } else {
            return 0;
          }
        } else if (j > draggingIndex.current!) {
          if (j <= position) {
            return -1 * (draggedItemHeight + draggingItemSpacing.current!);
          } else {
            return 0;
          }
        } else {
          return movedY;
        }
      });

      itemRefs.current?.forEach((node, i) => {
        if (node) {
          node.style.transform = `translateY(${itemShiftsY.current[i]}px)`;
        }
      });

      targetIndex.current = position;

      shiftY.current =
        getDraggedItemPositionY(
          draggingItemHeights.current,
          draggingItemSpacing.current!,
          draggingIndex.current!,
          position,
        ) -
        getDraggedItemPositionY(
          draggingItemHeights.current,
          draggingItemSpacing.current!,
          draggingIndex.current!,
          draggingIndex.current!,
        );
    },
    [currentItems],
  );

  const onDragEnd = useCallback(() => {
    if (touchId.current) {
      touchId.current = null;
      document.removeEventListener('touchmove', onDragMove);
      document.removeEventListener('touchend', onDragEnd);
    } else {
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);
    }

    setIsDragging(false);
    setWillEndDragging(true);

    const newItems = [...currentItems];
    const [movedItem] = newItems.splice(draggingIndex.current!, 1);
    newItems.splice(targetIndex.current!, 0, movedItem);

    setTimeout(() => {
      if (movedItem && draggingIndex.current !== targetIndex.current) {
        const updatedColumns = getSortedColumns<T, C>(currentItems, newItems);

        onChange?.(updatedColumns);
      }

      setWillEndDragging(false);
      setCurrentItems(newItems);

      itemShiftsY.current = [];
      draggingIndex.current = null;
      targetIndex.current = null;
      draggingOffsetTop.current = null;
      draggingItemSpacing.current = null;
      draggingItemHeights.current = [];
      shiftY.current = null;
      dragStartY.current = 0;
    }, 200);
  }, [onChange, currentItems]);

  useEffect(() => {
    if (willEndDragging) {
      const item = itemRefs.current?.[draggingIndex.current!];
      if (item) {
        item.style.transform = `translateY(${shiftY.current}px)`;
      }
    }
  }, [willEndDragging]);

  return {
    currentItems,
    isDragging,
    draggingIndex: draggingIndex.current,
    handleMouseDown,
    willEndDragging,
    itemShiftsY: itemShiftsY.current,
  };
};

function getDraggedItemPosition(
  itemHeights: number[],
  itemSpacing: number,
  draggedItemOffsetTop: number,
  initialPosition: number,
): number {
  const scanLineY =
    draggedItemOffsetTop + itemHeights[initialPosition] / 2 + itemSpacing / 2;
  let y = 0;
  let i = 0;
  while (i < itemHeights.length) {
    y += itemHeights[i] + itemSpacing;
    if (scanLineY <= y) {
      return i;
    }
    i++;
  }
  return itemHeights.length - 1;
}

function getDraggedItemPositionY(
  itemHeights: number[],
  itemSpacing: number,
  initialPosition: number,
  position: number,
): number {
  let top = 0;
  let j = 0;
  while (j < position) {
    if (j === initialPosition) {
      position++;
    } else {
      top += itemHeights[j] + itemSpacing;
    }
    j++;
  }
  return top;
}
