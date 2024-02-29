import { css } from '@emotion/react';
import { Checkbox, Scrollbar } from '@shared/components';
import { useMemo, useState } from 'react';
import { AdminListFilterSearch } from './AdminListFilterSearch/AdminListFilterSearch';
import { styles } from './AdminListFilterControl.styles';

type Props = {
  items: AdminFilterDropdownItem[];
  values: string[];
  onChange: (filters: AdminFilterDropdownItem) => void;
};

export const AdminListFilterControl = ({ items, values, onChange }: Props) => {
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
      <AdminListFilterSearch onSearch={(search) => handleSearch(search)} />
      <Scrollbar additionalStyles={[styles.scrollbar]}>
        <ul>
          {filteredItems?.map((item) => (
            <li css={styles.item} key={item.id}>
              <Checkbox
                id={item.id}
                checked={values?.some((value) => value === item.id)}
                name={item.name!}
                onChange={() => onChange(item)}
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
          ))}
        </ul>
      </Scrollbar>
    </>
  );
};
