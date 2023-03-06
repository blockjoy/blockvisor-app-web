import { mapServicesToRows } from '@modules/billing';
import { Table } from '@shared/index';

export type ServicesProps = {
  services: any[];
};

export const Services = ({ services }: any) => {
  const { headers, rows } = mapServicesToRows(services);

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
