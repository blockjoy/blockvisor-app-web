import { PageHeader } from '../shared';
import { Button } from '@shared/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { appState } from '@modules/app/store';
import IconNodes from '@public/assets/icons/box-12.svg';
import { dashboardNodeStyles } from './dashboardNode.styles';
import { Skeleton } from '../shared';
import { skeletonStyles } from '../shared/skeleton/skeleton.styles';

const icons = [<IconNodes />, <IconNodes />, <IconNodes />];

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
      {dashboardLoading ? (
        <div css={skeletonStyles.skeletonGrid}></div>
      ) : (
        <ul css={dashboardNodeStyles.list}>
          {dashboard.nodeMetrics.map((item, index) => (
            <li css={dashboardNodeStyles.itemBlock} key={item.name}>
              <span css={dashboardNodeStyles.itemValue}>{item.value}</span>
              <span css={dashboardNodeStyles.itemLabel}>
                <span css={dashboardNodeStyles.itemLabelIcon}>
                  {icons[index]}
                </span>
                <span css={dashboardNodeStyles.itemLabelText}>{item.name}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
