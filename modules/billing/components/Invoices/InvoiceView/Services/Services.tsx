import { mapServicesToRows } from '@modules/billing';
import { Table } from '@shared/index';
import { styles } from './Services.styles';

export type ServicesProps = {
  services: any[];
};

export const Services = ({ services }: any) => {
  const { headers, rows } = mapServicesToRows(services);

  return (
    <Table
      additionalStyles={styles.totalWrapper}
      isLoading={'finished'}
      headers={headers}
      rows={rows}
    />
  );
};
