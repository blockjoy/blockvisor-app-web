import { mapServicesToRows } from '@modules/billing';
import { Table } from '@shared/index';
import { styles } from './Services.styles';
import { InvoiceLineItem } from 'chargebee-typescript/lib/resources';

export type ServicesProps = {
  services: InvoiceLineItem[];
  total: number;
};

export const Services = ({ services, total }: ServicesProps) => {
  const { headers, rows } = mapServicesToRows(services, total);

  return (
    <Table
      additionalStyles={[styles.totalWrapper]}
      isLoading={'finished'}
      headers={headers}
      rows={rows}
    />
  );
};
