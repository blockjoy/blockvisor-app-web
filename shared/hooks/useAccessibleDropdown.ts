import { useCallback, useEffect, useRef, useState } from 'react';

type UseAccessibleDropdownParams<T> = {
  items: T[];
  selectedItem: T | null;
  isOpen: boolean;
  handleOpen: (open?: boolean) => void;
  handleSelect: (item: T, index: number) => void;
  searchQuery?: string;
};

type UseAccessibleDropdownReturnType = {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  handleItemRef: (element: HTMLLIElement, index: number) => void;
  handleFocus: VoidFunction;
  handleBlur: VoidFunction;
};

export const useAccessibleDropdown = <T>({
  items,
  selectedItem,
  isOpen,
  handleOpen,
  handleSelect,
  searchQuery,
}: UseAccessibleDropdownParams<T>): UseAccessibleDropdownReturnType => {
  const selectedItemIndex = selectedItem ? items.indexOf(selectedItem) : 0;
  const [activeIndex, setActiveIndex] = useState(selectedItemIndex);

  const [isFocus, setIsFocus] = useState(false);

  const itemRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (activeIndex !== selectedItemIndex) setActiveIndex(selectedItemIndex);
  }, [selectedItem, selectedItemIndex]);

  useEffect(() => {
    if (typeof searchQuery !== 'undefined') setActiveIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      if (!isOpen) return;

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
          handleFocus();
          break;
        case 'Esc':
        case 'Escape':
        case 'Tab':
          e.preventDefault();
          handleOpen(false);
          handleFocus();
          handleReset();
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
  }, [isOpen, items, activeIndex]);

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      if (isOpen || !isFocus) return;

      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
        case 'Down':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          handleOpen();
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
  }, [isOpen, isFocus]);

  const handleSelectWhenAccessible = useCallback((item: T, index: number) => {
    handleSelect(item, index);
    setActiveIndex(index);
  }, []);

  const handleItemRef = useCallback(
    (element: HTMLLIElement, index: number) => {
      itemRefs.current[index] = element;
    },
    [items],
  );

  const handleReset = useCallback(() => {
    if (selectedItem) return;

    setActiveIndex(0);
    itemRefs.current[0]?.scrollIntoView({
      block: 'nearest',
    });
  }, [selectedItem]);

  const handleFocus = useCallback(() => setIsFocus(true), []);
  const handleBlur = useCallback(() => setIsFocus(false), []);

  return {
    activeIndex,
    setActiveIndex,
    handleItemRef,
    handleFocus,
    handleBlur,
  };
};
