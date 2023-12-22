import { ChangeEvent, ComponentType, useState } from 'react';
import { ListProps, ListSearch } from '@shared/components';
import { filterSearch } from '@shared/index';

export type WithSearchListProps<T> = ListProps<T> & {
  searchPlaceholder?: string;
};

export const withSearchList = <T extends { name: string }>(
  Component: ComponentType<WithSearchListProps<T>>,
) => {
  const WithSearchList = ({ ...props }: WithSearchListProps<T>) => {
    const { items, searchPlaceholder, handleFocus } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<T[]>(items);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);

      const filtered = filterSearch<T>(items, query);

      setFilteredData(filtered);
    };

    return (
      <>
        <ListSearch
          name="search-list"
          value={searchQuery}
          handleChange={handleSearch}
          placeholder={searchPlaceholder}
          handleFocus={handleFocus}
        />
        <Component {...props} items={filteredData} searchQuery={searchQuery} />
      </>
    );
  };

  WithSearchList.displayName = `withSearch(${Component.name || 'Component'})`;

  return WithSearchList;
};
