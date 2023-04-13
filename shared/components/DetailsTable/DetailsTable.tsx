import { FC } from 'react';
import { table } from 'styles/table.styles';
import { DataRow } from '../DataRow/DataRow';

import { styles } from './DetailsTable.styles';

interface Props {
  bodyElements: { id?: string; label: string; data: string }[];
}

export const DetailsTable: FC<Props> = ({ bodyElements }) => {
  return (
    <table css={[table.base, styles.base]}>
      <tbody>
        {bodyElements?.map((item) => (
          <DataRow key={item.id ? item.id : item.label} label={item.label}>
            {item.data}
          </DataRow>
        ))}
      </tbody>
    </table>
  );
};
