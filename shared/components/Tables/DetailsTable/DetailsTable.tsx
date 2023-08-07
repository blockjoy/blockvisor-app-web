import { Copy } from '@shared/components/General';
import { FC, ReactNode } from 'react';
import { table } from 'styles/table.styles';
import { DataRow } from './DataRow/DataRow';

import { styles } from './DetailsTable.styles';

type DetailsDataRow = {
  id?: string;
  label: ReactNode | string;
  data: any;
};

type DetailsTableProps = {
  bodyElements: DetailsDataRow[];
};

export const DetailsTable: FC<DetailsTableProps> = ({ bodyElements }) => {
  return (
    <table css={[table.base, styles.base]}>
      <tbody>
        {bodyElements?.map((item: DetailsDataRow, itemIndex: number) => (
          <DataRow key={item.id ? item.id : itemIndex} label={item.label}>
            {item.data}
          </DataRow>
        ))}
      </tbody>
    </table>
  );
};
