import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

type UseAccessibleGridParams<T> = {
  items: T[];
  selectedItem?: T | null;
  handleSelect?: (item: T) => void;
  searchQuery?: string;
  isFocused?: boolean;
  handleFocus?: (isFocus: boolean) => void;
  gridRef?: RefObject<HTMLDivElement>;
  columnsPerPage?: number;
};

type UseAccessibleGridReturnType = {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  handleItemRef: (element: HTMLDivElement, index: number) => void;
};

export const useAccessibleGrid = <T extends { id?: string; name?: string }>({
  items,
  selectedItem,
  handleSelect,
  searchQuery,
  isFocused,
  handleFocus,
  gridRef,
  columnsPerPage,
}: UseAccessibleGridParams<T>): UseAccessibleGridReturnType => {
  const selectedItemIndex = selectedItem ? items.indexOf(selectedItem) : 0;
  const [activeIndex, setActiveIndex] = useState(selectedItemIndex);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (activeIndex !== selectedItemIndex) setActiveIndex(selectedItemIndex);
  }, [selectedItem, selectedItemIndex]);

  useEffect(() => {
    if (searchQuery !== '') setActiveIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      if (!isFocused || !columnsPerPage) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prevIndex) => {
            const newIndex = prevIndex - columnsPerPage;

            if (newIndex < 0) {
              const wrappedIndex = items.length + newIndex;
              const columnOffset = wrappedIndex % columnsPerPage;
              const finalIndex = wrappedIndex + columnOffset - prevIndex;

              return finalIndex;
            }

            return newIndex;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prevIndex) => {
            const newIndex = prevIndex + columnsPerPage;

            return newIndex >= items.length
              ? prevIndex % columnsPerPage
              : newIndex;
          });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setActiveIndex(activeIndex <= 0 ? items.length - 1 : activeIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setActiveIndex(activeIndex + 1 >= items.length ? 0 : activeIndex + 1);
          break;
        case 'Enter':
          e.preventDefault();
          handleSelectWhenAccessible(items[activeIndex], activeIndex);
          break;
        case 'Esc':
        case 'Escape':
        case 'Tab':
          handleBlur();
          break;
        case 'PageUp':
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          return;
        case 'PageDown':
        case 'End':
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownCallback);
    return () => {
      document.removeEventListener('keydown', keyDownCallback);
    };
  }, [isFocused, items, activeIndex, columnsPerPage]);

  useEffect(() => {
    if (isMobile) return;

    const mouseOverCallback = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!gridRef?.current) return;

      const divElement = (e.target as HTMLDivElement)?.closest('div');

      if (divElement) {
        const index = itemRefs.current.indexOf(divElement as HTMLDivElement);
        setActiveIndex(index);
      }
    };

    const mouseLeaveCallback = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveIndex(-1);
    };

    gridRef?.current?.addEventListener('mousemove', mouseOverCallback);
    gridRef?.current?.addEventListener('mouseleave', mouseLeaveCallback);
    return () => {
      gridRef?.current?.removeEventListener('mousemove', mouseOverCallback);
      gridRef?.current?.removeEventListener('mouseleave', mouseLeaveCallback);
    };
  }, [items]);

  const handleItemRef = useCallback(
    (element: HTMLDivElement, index: number) => {
      itemRefs.current[index] = element;
    },
    [items],
  );

  const handleSelectWhenAccessible = useCallback(
    (item: T, index: number) => {
      if (item?.id === selectedItem?.id!) return;

      setActiveIndex(index);
      handleSelect?.(item);
    },
    [selectedItem],
  );

  const handleBlur = useCallback(() => handleFocus?.(false), []);

  return {
    activeIndex,
    setActiveIndex,
    handleItemRef,
  };
};
