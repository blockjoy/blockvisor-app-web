import { PageTitle } from '@shared/components';
import { NodeTitle } from '../../Shared';
import IconRocket from '@public/assets/icons/rocket-12.svg';

export const NodeLauncherTitle = () => (
  <PageTitle>
    <NodeTitle titleText="Launch Node" icon={<IconRocket />} />
  </PageTitle>
);
