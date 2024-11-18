import { ChangeEvent, ComponentType, useState } from 'react';
import { filterSearch } from '@shared/index';
import { DropdownSearch } from '../DropdownSearch/DropdownSearch';
import { DropdownProps } from '../Dropdown';

type WithSearchDropdownProps = {
  searchPlaceholder?: string;
  emptyMessage?: string;
  addNewMessage?: string;
  onSubmit?: (tag: string) => void;
};

export const withSearchDropdown = <T extends { id?: string; name?: string }>(
  Component: ComponentType<DropdownProps<T>>,
  customProps?: WithSearchDropdownProps,
) => {
  const WithSearchDropdown = (props: DropdownProps<T>) => {
    const { items, handleSelected } = props;
    const { searchPlaceholder, emptyMessage, addNewMessage, onSubmit } =
      customProps ?? {};

    const [searchQuery, setSearchQuery] = useState('');
    const [isTouchedQuery, setIsTouchedQuery] = useState(false);
    const [filteredData, setFilteredData] = useState<T[]>(items);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isTouchedQuery) setIsTouchedQuery(true);

      const query = e.target.value;
      setSearchQuery(query);

      const filtered = filterSearch<T>(items, query);

      setFilteredData(filtered);
    };

    const handleSelect = (item: T | null) => {
      handleSelected(item!);
      setSearchQuery('');
      // Added Timeout due to animation in the DropdownMenu
      setTimeout(() => {
        setFilteredData(items);
      }, 300);
    };

    const handleSubmit = (query: string) => {
      if (filteredData.length) return;

      onSubmit?.(query);
      setSearchQuery('');
    };

    return (
      <Component
        {...props}
        handleSelected={handleSelect}
        items={filteredData}
        searchQuery={searchQuery}
        isTouchedQuery={isTouchedQuery}
        renderSearch={(isOpen: boolean) => (
          <DropdownSearch
            name="search-dropdown"
            value={searchQuery}
            handleChange={handleSearch}
            isOpen={isOpen}
            isEmpty={!filteredData.length}
            {...(searchPlaceholder && { placeholder: searchPlaceholder })}
            {...(emptyMessage && {
              emptyMessage: searchQuery.length ? addNewMessage : emptyMessage,
            })}
            {...(Boolean(onSubmit) && { handleSubmit })}
          />
        )}
      />
    );
  };

  WithSearchDropdown.displayName = `withSearchDropdown(${
    Component.name || 'Component'
  })`;

  return WithSearchDropdown;
};
