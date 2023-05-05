import { mapServicesToRows } from '@modules/billing';
import { Table } from '@shared/index';
import { styles } from './Services.styles';

export type ServicesProps = {
  services: any[];
  total: number;
};

export const Services = ({ services, total }: any) => {
  const { headers, rows } = mapServicesToRows(services, total);

  return (
    <Table
      additionalStyles={styles.totalWrapper}
      isLoading={'finished'}
      headers={headers}
      rows={rows}
    />
  );
};
