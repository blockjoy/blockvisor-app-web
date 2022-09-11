import { PageHeader } from '../shared';
import { Button } from '@shared/components';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store';
import IconNodes from '@public/assets/icons/box-12.svg';
import { dashboardNodeStyles } from './dashboardNode.styles';

const mockItems = [
  {
    icon: <IconNodes />,
    label: 'Nodes',
    value: 49,
  },
  {
    icon: <IconNodes />,
    label: 'Online',
    value: 15,
  },
  {
    icon: <IconNodes />,
    label: 'Syncing',
    value: 14,
  },
];

export const DashboardNodeSummary = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const handleAddNode = () => setLayout({ ...layout, isNodeAddOpen: true });
  return (
    <>
      <PageHeader>
        Your Nodes
        <Button size="small" style="secondary" onClick={handleAddNode}>
          Add Node
        </Button>
      </PageHeader>
      <ul css={dashboardNodeStyles.list}>
        {mockItems.map((item) => (
          <span css={dashboardNodeStyles.itemBlock} key={item.label}>
            <span css={dashboardNodeStyles.itemValue}>{item.value}</span>
            <span css={dashboardNodeStyles.itemLabel}>
              <span css={dashboardNodeStyles.itemLabelIcon}>{item.icon}</span>
              <span css={dashboardNodeStyles.itemLabelText}>{item.label}</span>
            </span>
          </span>
        ))}
      </ul>
    </>
  );
};
