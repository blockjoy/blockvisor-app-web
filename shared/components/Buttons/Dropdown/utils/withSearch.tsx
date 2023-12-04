import { ChangeEvent, ComponentType, useState } from 'react';
import { DropdownSearch } from '../DropdownSearch/DropdownSearch';
import { DropdownProps } from '../Dropdown';
import { filterData } from './filterData';

export const withSearch = <T extends { id?: string; name?: string }>(
  Component: ComponentType<DropdownProps<T>>,
) => {
  const withSearch = ({ ...props }: DropdownProps<T>) => {
    const { items, handleSelected } = props;

    const [searchQuery, setSearchQuery] = useState('');

    const [filteredData, setFilteredData] = useState<T[]>(items);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);

      const filtered = filterData<T>(items, query);

      setFilteredData(filtered);
    };

    const handleSelect = (item: T | null) => {
      handleSelected(item);
      setSearchQuery('');
      // Added Timeout due to animation in the DropdownMenu
      setTimeout(() => {
        setFilteredData(items);
      }, 300);
    };

    return (
      <Component
        {...props}
        handleSelected={handleSelect}
        items={filteredData}
        searchQuery={searchQuery}
        renderSearch={(isOpen: boolean) => (
          <DropdownSearch
            name="search-query"
            value={searchQuery}
            handleChange={handleSearch}
            isOpen={isOpen}
            isEmpty={!filteredData.length}
          />
        )}
      />
    );
  };

  withSearch.displayName = `withSearch(${Component.name || 'Component'})`;

  return withSearch;
};
