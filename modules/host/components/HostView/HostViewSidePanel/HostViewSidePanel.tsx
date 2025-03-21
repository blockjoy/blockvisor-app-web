import { useHostView } from '@modules/host';
import { NetdataDashboard } from '@shared/components';

export const HostViewSidePanel = () => {
  const { host } = useHostView();
  return <NetdataDashboard id={host?.displayName!} name={host?.displayName!} />;
};
