import { styles } from './Filtering.styles';
import { Filter } from './Filter';

export type FilteringProps = {
  filters?: FilteringItem[];
  values: any;
  onFilterChange: (key: string, value: string) => void;
};

export const Filtering = ({
  filters,
  values,
  onFilterChange,
}: FilteringProps) => {
  const handleSelection = (key: string, value: string) => {
    onFilterChange(key, value);
  };

  return filters?.length ? (
    <div css={styles.wrapper}>
      {filters.map((filter: FilteringItem) => (
        <Filter
          key={filter.id}
          filter={filter}
          handleSelection={handleSelection}
          active={values[filter.id].value}
        />
      ))}
    </div>
  ) : null;
};
