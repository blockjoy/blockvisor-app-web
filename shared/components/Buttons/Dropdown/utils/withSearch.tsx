import { ChangeEvent, ComponentType, useState } from 'react';
import { DropdownSearch } from '../DropdownSearch/DropdownSearch';
import { DropdownProps } from '../Dropdown';
import { filterData } from './filterData';

export const withSearch = <T extends { id?: string; name?: string }>(
  Component: ComponentType<DropdownProps<T>>,
) => {
  const withSearch = ({ ...props }: DropdownProps<T>) => {
    const { items } = props;

    const [searchQuery, setSearchQuery] = useState('');

    const [filteredData, setFilteredData] = useState<T[]>(items);

    const handleCountrySearch = (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);

      const filtered = filterData<T>(items, query);

      setFilteredData(filtered);
    };

    return (
      <Component
        {...props}
        items={filteredData}
        renderSearch={(isOpen: boolean) => (
          <DropdownSearch
            name="search-query"
            value={searchQuery}
            handleChange={handleCountrySearch}
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
