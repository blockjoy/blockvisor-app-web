import { useHostView } from '@modules/host';
import { NetdataDashboard } from '@shared/components';

export const HostViewSidePanel = () => {
  const { host } = useHostView();
  return (
    <NetdataDashboard id={host?.name!} disk_space_name="_var_lib_blockvisor" />
  );
};
