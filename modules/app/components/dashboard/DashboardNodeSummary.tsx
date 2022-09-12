import { PageHeader } from '../shared';
import { Button } from '@shared/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { appState } from '@modules/app/store';
import IconNode from '@public/assets/icons/box-12.svg';
import IconNodeOnline from '@public/assets/icons/node-online-12.svg';
import IconNodeOffline from '@public/assets/icons/node-offline-12.svg';
import { dashboardNodeStyles as styles } from './dashboardNode.styles';
import { Skeleton } from '../shared';

const icons = [<IconNode />, <IconNodeOnline />, <IconNodeOffline />];

export const DashboardNodeSummary = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
  const { nodeMetrics } = dashboard;
  const handleAddNode = () => setLayout({ ...layout, isNodeAddOpen: true });
  return (
    <>
      <PageHeader>
        Your Nodes
        <Button
          disabled={dashboardLoading}
          size="small"
          style="secondary"
          onClick={handleAddNode}
        >
          Add Node
        </Button>
      </PageHeader>
      {!dashboardLoading ? (
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
