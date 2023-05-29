import { TableSkeleton } from '@shared/components';
import { useHostView } from '@modules/host';
import { HostViewDashboardDetails } from './Details/HostViewDashboardDetails';
import { HostViewDashboardNodes } from './Nodes/HostViewDashboardNodes';
import { styles } from './HostViewDashboard.styles';

export const HostViewDashboard = () => {
  const { isLoading, host } = useHostView();

  return isLoading !== 'finished' && !host?.id ? (
    <TableSkeleton />
  ) : (
    <>
      <div css={styles.wrapper}>
        <HostViewDashboardDetails />
        <HostViewDashboardNodes />
      </div>
    </>
  );
};
