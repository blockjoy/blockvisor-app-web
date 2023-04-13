import { Button } from '../Button/Button';
import { ButtonWithDropdown } from '../ButtonWithDropdown/ButtonWithDropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { styles } from './Filter.styles';
import IconArrow from '@public/assets/icons/arrow-down.svg';
import { Badge } from '../Badge/Badge';

export type FilterProps = {
  filter: FilteringItem;
  active: string | number;
  handleSelection: (key: string, value: string) => void;
};

export const Filter = ({ filter, active, handleSelection }: FilterProps) => {
  const activeFilter = filter.entries.find((f: any) => f.value === active);
  const activeFilterTitle = activeFilter ? activeFilter.label : 'All';

  return (
    <ButtonWithDropdown
      button={
        <div>
          <Button style="outline" css={styles.button}>
            <span>{activeFilterTitle}</span>
            <span css={styles.arrowIcon}>
              <IconArrow />
            </span>
          </Button>
          <small css={styles.buttonLabel}>Filter by {filter.title}</small>
        </div>
      }
    >
      <ul>
        <li key={'all'}>
          <DropdownItem
            onButtonClick={() => handleSelection(filter.id, '')}
            type="button"
            size="medium"
            additionalStyles={active === '' ? [styles.activeFilter] : undefined}
          >
            All
            {active === '' && (
              <Badge color="primary" style="outline">
                Selected
              </Badge>
            )}
          </DropdownItem>
        </li>
        {filter.entries.map((entry: any) => (
          <li key={entry.value}>
            <DropdownItem
              onButtonClick={() => handleSelection(filter.id, entry.value)}
              type="button"
              size="medium"
              additionalStyles={
                active === entry.value ? [styles.activeFilter] : undefined
              }
            >
              {entry.label}
              {active === entry.value && (
                <Badge color="primary" style="outline">
                  Selected
                </Badge>
              )}
            </DropdownItem>
          </li>
        ))}
      </ul>
    </ButtonWithDropdown>
  );
};
