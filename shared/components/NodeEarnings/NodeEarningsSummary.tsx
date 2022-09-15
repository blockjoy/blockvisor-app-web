import { PageHeader } from '@modules/app/components/shared';
import { mockEarningsData as mockItems } from './mockEarningsData';
import { dashboardEarningsStyles } from './NodeEarnings.styles';

export const NodeEarningsSummary = () => {
  return (
    <>
      <PageHeader>Earnings</PageHeader>
      <ul css={dashboardEarningsStyles.list}>
        {mockItems.map((item) => (
          <li key={item.name}>
            <span css={dashboardEarningsStyles.itemHeader}>{item.name}</span>
            <span css={dashboardEarningsStyles.itemRow}>
              <span css={dashboardEarningsStyles.itemValue}>{item.value}</span>
              <span>HNT</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
