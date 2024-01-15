import { ReactNode, useRef } from 'react';
import { useAccessibleList } from '@shared/index';

export type ListProps<T = any> = {
  items: T[];
  selectedItem?: T | null;
  renderItem: (item: T, isActiveItem?: boolean) => ReactNode;
  renderEmpty?: () => ReactNode;
  handleSelect?: (item: T) => void;
  searchQuery?: string;
  isFocused?: boolean;
  handleFocus?: (isFocus: boolean) => void;
  isLoading?: boolean;
};

export const List = <T extends { id?: string; name?: string }>({
  items,
  selectedItem,
  renderItem,
  renderEmpty,
  handleSelect,
  searchQuery,
  isFocused,
  handleFocus,
}: ListProps<T>) => {
  const listRef = useRef<HTMLUListElement>(null);
  const { activeIndex, handleItemRef } = useAccessibleList({
    items,
    selectedItem,
    handleSelect,
    searchQuery,
    isFocused,
    handleFocus,
    listRef,
  });

  return items.length > 0 ? (
    <ul ref={listRef}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <li
            key={item?.id}
            ref={(el: HTMLLIElement) => handleItemRef(el, index)}
          >
            {renderItem(item, isActive)}
          </li>
        );
      })}
    </ul>
  ) : (
    <>{renderEmpty?.()}</>
  );
};
