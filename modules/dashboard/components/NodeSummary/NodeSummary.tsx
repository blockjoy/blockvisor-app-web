import { appState } from '@modules/dashboard/store';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import IconNode from '@public/assets/icons/box-12.svg';
import IconNodeOffline from '@public/assets/icons/node-offline-12.svg';
import IconNodeOnline from '@public/assets/icons/node-online-12.svg';
import { Button, PageHeader, Skeleton } from '@shared/components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { dashboardNodeStyles as styles } from '../Dashboard/Dashboard.styles';

const icons = [<IconNode />, <IconNodeOnline />, <IconNodeOffline />];

export const NodeSummary = () => {
  const setLayoutState = useSetRecoilState(layoutState);
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
  const { nodeMetrics } = dashboard;
  const loading =
    dashboardLoading === 'loading' || dashboardLoading === 'initializing';
  return (
    <>
      <PageHeader>
        Your Nodes
        <Button
          disabled={loading}
          size="small"
          style="secondary"
          onClick={() => setLayoutState('nodes')}
        >
          Add Node
        </Button>
      </PageHeader>
      {!loading ? (
        <ul css={styles.list}>
          {nodeMetrics.map((item, index) => (
            <li
              css={[
                styles.itemBlock,
                item.isPrimary && styles.itemBlockPrimary,
                item.isGreyedOut && styles.itemBlockGreyedOut,
              ]}
              key={item.name}
            >
              <span css={styles.itemValue}>{item.value}</span>
              <span css={styles.itemLabel}>
                <span>{icons[index]}</span>
                <span>{item.name}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <Skeleton width="200px" height="20px" margin="10px 0 20px" />
          <Skeleton width="100px" height="20px" margin="0 0 8px" />
        </div>
      )}
    </>
  );
};
