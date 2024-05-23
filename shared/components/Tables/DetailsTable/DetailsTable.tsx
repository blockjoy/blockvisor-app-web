import { table } from 'styles/table.styles';
import { DataRow } from './DataRow/DataRow';

import { styles } from './DetailsTable.styles';

export type DetailsDataRow = {
  id?: string;
  label: React.ReactNode | string;
  data: any;
};

type DetailsTableProps = {
  bodyElements: DetailsDataRow[];
};

export const DetailsTable = ({ bodyElements }: DetailsTableProps) => {
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
