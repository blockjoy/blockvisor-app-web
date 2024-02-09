import { css } from '@emotion/react';
import { Checkbox } from '@shared/components';
import { styles } from './AdminListFilterControl.styles';

type Props = {
  items: AdminFilterDropdownItem[];
  values: string[];
  onChange: (filters: AdminFilterDropdownItem) => void;
};

export const AdminListFilterControl = ({ items, values, onChange }: Props) => {
  return (
    <ul>
      {items?.map((item) => (
        <li css={styles.item} key={item.id}>
          <Checkbox
            id={item.id}
            checked={values?.some((value) => value === item.id)}
            name={item.name!}
            onChange={() => onChange(item)}
            additionalStyles={[
              css`
                flex: 1 1 auto;
                padding: 6px 52px 6px 10px;
              `,
            ]}
          >
            {item.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};
