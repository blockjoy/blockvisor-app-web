import { ReactNode, useRef } from 'react';
import { useAccessibleList } from '@shared/index';
import { Scrollbar } from '@shared/components';
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
  scrollable?: boolean;
  listScrollbarStyles: SerializedStyles[];
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
  scrollable = false,
  listScrollbarStyles,
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
  );

  return items.length > 0 ? (
    scrollable ? (
      <Scrollbar
        {...(listScrollbarStyles && { additionalStyles: listScrollbarStyles })}
      >
        {listContent}
      </Scrollbar>
    ) : (
      listContent
    )
  ) : (
    <>{renderEmpty?.()}</>
  );
};
