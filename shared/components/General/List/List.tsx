import { ReactNode, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useAccessibleList } from '@shared/index';
import { SerializedStyles } from '@emotion/react';

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
  additionalyStyles: SerializedStyles[];
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
  additionalyStyles,
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

  const listContent = (
    <ul
      ref={listRef}
      {...(additionalyStyles ? { css: additionalyStyles } : null)}
    >
      {items.map((item, index) => {
        const isActive = !isMobile
          ? index === activeIndex
          : selectedItem?.id === item.id;

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
  );

  return items.length > 0 ? listContent : <>{renderEmpty?.()}</>;
};
