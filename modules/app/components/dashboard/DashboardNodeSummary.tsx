import { PageHeader } from '../shared';
import { Button } from '@shared/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { appState } from '@modules/app/store';
import IconNode from '@public/assets/icons/box-12.svg';
import IconNodeOnline from '@public/assets/icons/node-online-12.svg';
import IconNodeOffline from '@public/assets/icons/node-offline-12.svg';
import { dashboardNodeStyles as styles } from './Dashboard.styles';
import { Skeleton } from '../shared';

const icons = [<IconNode />, <IconNodeOnline />, <IconNodeOffline />];

export const DashboardNodeSummary = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
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
      {!dashboard?.nodeMetrics?.length ? (
        <Skeleton width="200px" height="20px" />
      ) : (
        <ul css={styles.list}>
          {dashboard.nodeMetrics.map((item, index) => (
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
      )}
    </>
  );
};
