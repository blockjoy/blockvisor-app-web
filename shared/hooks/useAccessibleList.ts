import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type UseAccessibleListParams<T> = {
  items: T[];
  selectedItem?: T | null;
  handleSelect?: (item: T) => void;
  searchQuery?: string;
  isFocused?: boolean;
  handleFocus?: (isFocus: boolean) => void;
  listRef?: RefObject<HTMLUListElement>;
};

type UseAccessibleListReturnType = {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  handleItemRef: (element: HTMLLIElement, index: number) => void;
};

export const useAccessibleList = <T extends { id?: string; name?: string }>({
  items,
  selectedItem,
  handleSelect,
  searchQuery,
  isFocused,
  handleFocus,
  listRef,
}: UseAccessibleListParams<T>): UseAccessibleListReturnType => {
  const selectedItemIndex = selectedItem ? items.indexOf(selectedItem) : 0;
  const [activeIndex, setActiveIndex] = useState(selectedItemIndex);

  const itemRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (activeIndex !== selectedItemIndex) setActiveIndex(selectedItemIndex);
  }, [selectedItem, selectedItemIndex]);

  useEffect(() => {
    if (searchQuery !== '') setActiveIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      if (!isFocused) return;

      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(
            activeIndex <= 0 ? items?.length - 1 : activeIndex - 1,
          );
          break;
        case 'Down':
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(
            activeIndex + 1 === items?.length ? 0 : activeIndex + 1,
          );
          break;
        case 'Enter':
          e.preventDefault();
          handleSelectWhenAccessible(items[activeIndex], activeIndex);
          break;
        case 'Esc':
        case 'Escape':
        case 'Tab':
          e.preventDefault();
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
          setActiveIndex(items?.length - 1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownCallback);
    return () => {
      document.removeEventListener('keydown', keyDownCallback);
    };
  }, [isFocused, items, activeIndex, selectedItem]);

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      if (!isFocused) return;

      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
        case 'Down':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          break;
        case 'Tab':
          handleBlur();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownCallback);
    return () => {
      document.removeEventListener('keydown', keyDownCallback);
    };
  }, [isFocused]);

  useEffect(() => {
    const mouseOverCallback = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!listRef?.current) return;

      const liElement = (e.target as HTMLElement)?.closest('li');

      if (liElement) {
        const index = itemRefs.current.indexOf(liElement as HTMLLIElement);

        setActiveIndex(index);
      }
    };

    listRef?.current?.addEventListener('mousemove', mouseOverCallback);
    return () => {
      listRef?.current?.removeEventListener('mousemove', mouseOverCallback);
    };
  }, [items]);

  const handleItemRef = useCallback(
    (element: HTMLLIElement, index: number) => {
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
