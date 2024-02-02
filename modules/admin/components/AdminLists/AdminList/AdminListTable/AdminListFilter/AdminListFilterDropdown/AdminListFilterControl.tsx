import { css } from '@emotion/react';
import { Checkbox } from '@shared/components';

type Props = {
  items: AdminFilterDropdownItem[];
  filterSettings: AdminListColumnFilterSettings;
  onChange: (filters: AdminFilterDropdownItem) => void;
};

export const AdminListFilterControl = ({
  items,
  filterSettings,
  onChange,
}: Props) => {
  return (
    <div>
      {items?.map((item) => (
        <Checkbox
          key={item.id}
          id={item.id}
          checked={filterSettings?.values?.some((value) => value === item.id)}
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
      ))}
    </div>
  );
};
