import { css } from '@emotion/react';
import { Checkbox, Scrollbar } from '@shared/components';
import { useMemo, useState } from 'react';
import { AdminListFilterSearch } from './AdminListFilterSearch/AdminListFilterSearch';
import { styles } from './AdminListFilterControl.styles';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';

export const AdminListFilterControl = ({
  isOpen,
  columnName,
  items,
  values,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [search, setSearch] = useState('');

  const handleSearch = (s: string) => setSearch(s);

  const filteredItems = useMemo(
    () =>
      items?.filter(
        (item) =>
          search === '' ||
          item.name?.toLowerCase()?.includes(search.toLocaleLowerCase()),
      ),
    [search, items],
  );

  return (
    <>
      <AdminListFilterSearch
        onSearch={(search) => handleSearch(search)}
        shouldAutoFocus={isOpen}
      />
      <Scrollbar additionalStyles={[styles.scrollbar]}>
        <ul>
          {filteredItems?.map((item) => {
            const key = `${columnName}-${item.id}-${item.name}`;
            return (
              <li css={styles.item} key={key}>
                <Checkbox
                  id={key}
                  checked={values?.some((value) => value === item.id)}
                  name={item.name!}
                  onChange={() => onFilterChange(item)}
                  additionalStyles={[
                    css`
                      flex: 1 1 auto;
                      padding: 6px 20px 6px 10px;
                    `,
                  ]}
                >
                  {item.name}
                </Checkbox>
              </li>
            );
          })}
        </ul>
      </Scrollbar>
    </>
  );
};
