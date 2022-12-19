import { PageTitle } from '@shared/components';
import { styles } from './NodeLauncherPageHeader.styles';

export const NodeLauncherPageHeader = () => (
  <PageTitle title="Node View">
    <div css={styles.wrapper}>
      <h1>Launch Node</h1>
    </div>
  </PageTitle>
);
