import { FC } from 'react';
import { table } from 'styles/table.styles';
import { DataRow } from '../data-row/DataRow';
import { styles } from './DetailsTable.styles';

interface Props {
  bodyElements: { label: string; data: string }[];
}

export const DetailsTable: FC<Props> = ({ bodyElements }) => {
  return (
    <table css={[table.base, styles.base]}>
      <tbody>
        {bodyElements?.map((item) => (
          <DataRow key={item.label} label={item.label}>
            {item.data}
          </DataRow>
        ))}
      </tbody>
    </table>
  );
};
